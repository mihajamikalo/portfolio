import { NextResponse } from "next/server";

type ContributionDay = {
  date: string;
  contributionCount: number;
};

type GraphQlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: ContributionDay[];
          }>;
        };
      };
    };
  };
  errors?: Array<{ message?: string }>;
};

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const contributionQuery = `
  query PortfolioContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const githubUsername = process.env.GITHUB_USERNAME?.trim();
  const githubToken = process.env.GITHUB_TOKEN?.trim();

  if (!githubUsername || !githubToken) {
    return NextResponse.json({
      ok: false,
      message:
        "GitHub graph is not configured yet. Set GITHUB_USERNAME and GITHUB_TOKEN in .env.local.",
    });
  }

  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0));

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: contributionQuery,
        variables: {
          login: githubUsername,
          from: from.toISOString(),
          to: now.toISOString(),
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Unable to load contribution data from GitHub right now.",
        },
        { status: response.status },
      );
    }

    const payload = (await response.json()) as GraphQlResponse;

    if (payload.errors?.length) {
      return NextResponse.json(
        {
          ok: false,
          message:
            payload.errors[0]?.message ??
            "GitHub returned an unexpected error while loading contributions.",
        },
        { status: 502 },
      );
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return NextResponse.json(
        {
          ok: false,
          message: "No contribution data was returned for this account.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => week.contributionDays),
      lastUpdated: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to contact GitHub. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
