import { NextResponse } from "next/server";

const resumeContent = `Portfolio Resume
================

Name: SANTATRINIAINA Tiavina Liantsoa
Role: Full-Stack Developer
Location: Antananarivo, Madagascar

Profile
-------
Full-stack developer with strong hands-on experience in PHP/Laravel, React.js, and Next.js.
Builds responsive and performant web products including CRM systems, school management platforms, and personal web applications.

Skills
------
- HTML / CSS
- PHP
- Laravel
- CodeIgniter
- MySQL
- Python
- Node.js
- React.js
- Next.js
- TypeScript
- Tailwind CSS
- Bootstrap
- WordPress

Experience
----------
- Jan 2024 - Apr 2024: PHP & Laravel Developer (Freelance)
- Jan 2025 - Apr 2025: A.I Data Training (Freelance)
- Nov 2024 - Mar 2025: Full-Stack Developer Intern, ESCM Business School
- Mar 2025 - Present: Full-Stack Developer Consultant, ESCM Business School

Education
---------
- 2023: Baccalaureat, Lycee Privee Edenah Ambohimanarina
- 2025 - Current: Licence Informatique et Management, ESPIC Antananarivo Ankazomanga

Contact
-------
mihajamikalo@gmail.com
+261341970025
LOT IVI 73 Antanety Nord Ambohimanarina
`;

export async function GET() {
  return new NextResponse(resumeContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="resume.txt"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
