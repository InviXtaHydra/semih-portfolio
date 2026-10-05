// Image placeholders drawn in each project's domain colors.
// Swap for real screenshots by passing `image` on a project in profile.js.

export default function ProjectArt({ title }) {
  const Art = arts[title] ?? DashboardArt
  return <Art />
}

const svgProps = {
  viewBox: '0 0 400 240',
  className: 'h-full w-full',
  preserveAspectRatio: 'xMidYMid meet',
  'aria-hidden': true,
}

// Employee Dashboard PWA: a phone app shell with KPI tiles and an offline badge
function DashboardArt() {
  const bars = [46, 72, 58, 90, 64, 80, 52]
  return (
    <svg {...svgProps}>
      <rect width="400" height="240" fill="var(--color-panel-2)" />
      <g transform="translate(40 26)">
        <rect width="200" height="188" rx="14" fill="var(--color-ink)" stroke="var(--color-rule)" />
        <rect x="14" y="14" width="80" height="8" rx="4" fill="var(--color-paper)" opacity=".7" />
        <rect x="14" y="30" width="50" height="6" rx="3" fill="var(--color-muted)" opacity=".5" />
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(${14 + i * 90} 48)`}>
            <rect width="82" height="44" rx="8" fill="var(--color-panel)" />
            <rect x="10" y="10" width="30" height="5" rx="2.5" fill="var(--color-muted)" opacity=".6" />
            <rect x="10" y="22" width="46" height="12" rx="3" fill={i ? 'var(--color-lowcode)' : 'var(--color-code)'} opacity=".9" />
          </g>
        ))}
        {bars.map((h, i) => (
          <rect key={i} x={18 + i * 25} y={176 - h} width="14" height={h} rx="3" fill="var(--color-code)" opacity={0.35 + i * 0.09} />
        ))}
      </g>
      <g transform="translate(262 40)">
        <rect width="104" height="34" rx="17" fill="var(--color-ink)" stroke="var(--color-lowcode)" strokeOpacity=".5" />
        <circle cx="20" cy="17" r="5" fill="var(--color-lowcode)" />
        <rect x="34" y="13" width="54" height="8" rx="4" fill="var(--color-paper)" opacity=".6" />
      </g>
      <g transform="translate(262 92)" stroke="var(--color-muted)" strokeOpacity=".35" fill="none">
        <path d="M0 20 H70 M0 44 H90 M0 68 H56" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// SAP BTP Integration Hub: systems connected through an event mesh
function IntegrationArt() {
  const left = [50, 120, 190]
  const right = [70, 170]
  return (
    <svg {...svgProps}>
      <rect width="400" height="240" fill="var(--color-panel-2)" />
      <g fill="none" stroke="var(--color-sap)" strokeOpacity=".45" strokeWidth="1.5">
        {left.map((y) => <path key={y} d={`M78 ${y} C 140 ${y}, 150 120, 200 120`} />)}
        {right.map((y) => <path key={y} d={`M200 120 C 250 120, 260 ${y}, 322 ${y}`} />)}
      </g>
      <g fill="none" stroke="var(--color-sap)" strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round">
        <path d="M78 50 C 140 50, 150 120, 200 120 C 250 120, 260 170, 322 170" />
      </g>
      {left.map((y, i) => (
        <g key={y} transform={`translate(24 ${y - 16})`}>
          <rect width="54" height="32" rx="8" fill="var(--color-ink)" stroke="var(--color-rule)" />
          <rect x="10" y="13" width={[30, 22, 34][i]} height="6" rx="3" fill="var(--color-paper)" opacity=".55" />
        </g>
      ))}
      <circle cx="200" cy="120" r="34" fill="var(--color-ink)" stroke="var(--color-sap)" strokeOpacity=".7" />
      <circle cx="200" cy="120" r="50" fill="none" stroke="var(--color-sap)" strokeOpacity=".18" />
      <circle cx="200" cy="120" r="10" fill="var(--color-sap)" />
      {right.map((y) => (
        <g key={y} transform={`translate(322 ${y - 18})`}>
          <rect width="56" height="36" rx="8" fill="var(--color-ink)" stroke="var(--color-rule)" />
          <path d="M12 12h32M12 20h22M12 28h28" stroke="var(--color-muted)" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

// AI-Powered SharePoint Intranet: a news page with an AI summary panel
function IntranetArt() {
  return (
    <svg {...svgProps}>
      <rect width="400" height="240" fill="var(--color-panel-2)" />
      <g transform="translate(30 24)">
        <rect width="340" height="200" rx="12" fill="var(--color-ink)" stroke="var(--color-rule)" />
        <rect x="0" y="0" width="340" height="28" rx="12" fill="var(--color-panel)" />
        <circle cx="16" cy="14" r="5" fill="var(--color-code)" />
        <rect x="30" y="10" width="60" height="8" rx="4" fill="var(--color-paper)" opacity=".5" />
        <rect x="16" y="42" width="190" height="80" rx="8" fill="var(--color-panel)" />
        <path d="M16 106 l46 -34 34 22 40 -30 70 42 v16 a8 8 0 0 1 -8 8 h-174 a8 8 0 0 1 -8 -8 z" fill="var(--color-code)" opacity=".25" />
        <rect x="16" y="134" width="150" height="8" rx="4" fill="var(--color-paper)" opacity=".6" />
        <rect x="16" y="150" width="190" height="6" rx="3" fill="var(--color-muted)" opacity=".4" />
        <rect x="16" y="164" width="170" height="6" rx="3" fill="var(--color-muted)" opacity=".4" />
        <g transform="translate(220 42)">
          <rect width="104" height="142" rx="10" fill="var(--color-panel)" stroke="var(--color-lowcode)" strokeOpacity=".5" />
          <path d="M16 20 l4 -8 4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 z" fill="var(--color-lowcode)" />
          <rect x="40" y="18" width="46" height="7" rx="3.5" fill="var(--color-lowcode)" opacity=".8" />
          {[46, 62, 78, 94].map((y, i) => (
            <rect key={y} x="14" y={y} width={[76, 62, 70, 48][i]} height="6" rx="3" fill="var(--color-paper)" opacity=".35" />
          ))}
          <rect x="14" y="114" width="76" height="16" rx="8" fill="var(--color-lowcode)" opacity=".2" />
        </g>
      </g>
    </svg>
  )
}

const arts = {
  'Employee Dashboard PWA': DashboardArt,
  'SAP BTP Integration Hub': IntegrationArt,
  'AI-Powered SharePoint Intranet': IntranetArt,
}
