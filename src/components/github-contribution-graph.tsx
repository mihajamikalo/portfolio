"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";

type ContributionDay = {
  date: string;
  contributionCount: number;
};

type ApiPayload =
  | {
      ok: true;
      totalContributions: number;
      weeks: ContributionDay[][];
      lastUpdated: string;
    }
  | {
      ok: false;
      message: string;
    };

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

type GithubContributionGraphProps = {
  locale: Locale;
};

function getContributionColorClass(count: number, maxCount: number): string {
  if (count === 0) return "contribution-cell-0";

  const ratio = maxCount === 0 ? 0 : count / maxCount;
  if (ratio >= 0.75) return "contribution-cell-4";
  if (ratio >= 0.5) return "contribution-cell-3";
  if (ratio >= 0.25) return "contribution-cell-2";
  return "contribution-cell-1";
}

export default function GithubContributionGraph({ locale }: GithubContributionGraphProps) {
  const [data, setData] = useState<ApiPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const response = await fetch("/api/github-contributions", {
          cache: "no-store",
        });
        const payload = (await response.json()) as ApiPayload;

        if (!active) return;
        setData(payload);
      } catch {
        if (!active) return;
        setData({
          ok: false,
          message:
            locale === "fr"
              ? "Impossible de charger le graphe de contributions GitHub."
              : "Could not load the GitHub contribution graph.",
        });
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    const interval = window.setInterval(fetchData, REFRESH_INTERVAL_MS);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [locale]);

  const maxCount = useMemo(() => {
    if (!data || !data.ok) return 0;
    const counts = data.weeks.flatMap((week) => week.map((day) => day.contributionCount));
    return counts.length ? Math.max(...counts) : 0;
  }, [data]);

  return (
    <section className="mt-12 rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-950">
        {locale === "fr" ? "Graphe des contributions GitHub" : "Github contribution graph"}
      </h2>
      <p className="mt-1 text-sm text-blue-900/75 sm:text-base">
        {data?.ok
          ? locale === "fr"
            ? `${data.totalContributions} contributions cette annee`
            : `${data.totalContributions} contributions this year`
          : locale === "fr"
            ? "Chargement du total..."
            : "Loading totals..."}
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-blue-900/75">
          {locale === "fr" ? "Chargement du graphe de contributions..." : "Loading contribution graph..."}
        </p>
      ) : null}

      {!isLoading && data && !data.ok ? (
        <p className="mt-4 text-sm text-blue-900/75">{data.message}</p>
      ) : null}

      {!isLoading && data?.ok ? (
        <>
          <div className="mt-6 overflow-x-auto">
            <div className="grid min-w-max grid-flow-col gap-1">
              {data.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={`contribution-cell h-3.5 w-3.5 rounded-[3px] border ${getContributionColorClass(
                        day.contributionCount,
                        maxCount,
                      )}`}
                      title={`${day.date}: ${day.contributionCount} ${
                        locale === "fr"
                          ? day.contributionCount > 1
                            ? "contributions"
                            : "contribution"
                          : `contribution${day.contributionCount > 1 ? "s" : ""}`
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-blue-900/70">
            {locale === "fr"
              ? "Actualisation automatique toutes les 5 minutes. Derniere mise a jour : "
              : "Auto-refreshes every 5 minutes. Last update: "}
            {new Date(data.lastUpdated).toLocaleTimeString()}
          </p>
        </>
      ) : null}
    </section>
  );
}
