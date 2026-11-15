/**
 * A wheat penny, drawn once and reused everywhere.
 *
 * The reverse of a Lincoln wheat cent: two stalks of wheat, "ONE CENT", and the
 * legend. The obverse (Lincoln's profile) is deliberately omitted — the wheat is
 * the point, because the page is about a *hwheat* penny rolling, not a president.
 */
export function WheatPenny({ size = 200, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="A wheat penny: ONE CENT between two stalks of wheat"
    >
      <defs>
        <radialGradient id="penny-copper" cx="38%" cy="34%" r="82%">
          <stop offset="0%" stopColor="#e4a96a" />
          <stop offset="42%" stopColor="#c07a3c" />
          <stop offset="78%" stopColor="#94501f" />
          <stop offset="100%" stopColor="#6b3415" />
        </radialGradient>
        <path id="penny-arc-top" d="M 36 100 A 64 64 0 0 1 164 100" fill="none" />
        <path id="penny-arc-bottom" d="M 36 100 A 64 64 0 0 0 164 100" fill="none" />
        <g id="penny-stalk">
          <path
            d="M 42 142 C 32 116 38 90 28 58"
            fill="none"
            stroke="#5a2d12"
            strokeWidth="1.7"
          />
          {[
            [40, 134], [36, 122], [36, 108], [33, 94], [30, 78], [29, 64],
          ].map(([cx, cy], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={2.6}
              ry={6.5}
              fill="#8a4a22"
              stroke="#5a2d12"
              strokeWidth="0.6"
              transform={`rotate(${i % 2 === 0 ? 24 : -22} ${cx} ${cy})`}
            />
          ))}
        </g>
      </defs>

      {/* body and rims */}
      <circle cx="100" cy="100" r="97" fill="#5a2d12" />
      <circle cx="100" cy="100" r="94" fill="url(#penny-copper)" />
      <circle cx="100" cy="100" r="94" fill="none" stroke="#d79a58" strokeWidth="2.5" opacity="0.5" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#6b3415" strokeWidth="1.2" opacity="0.8" />

      {/* legends */}
      <text
        fontSize="10"
        fill="#5a2d12"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="2"
      >
        <textPath href="#penny-arc-top" startOffset="50%" textAnchor="middle">
          UNITED STATES OF AMERICA
        </textPath>
      </text>
      <text
        fontSize="9"
        fill="#5a2d12"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="2"
      >
        <textPath href="#penny-arc-bottom" startOffset="50%" textAnchor="middle">
          E PLURIBUS UNUM
        </textPath>
      </text>

      {/* wheat stalks, left and mirrored right */}
      <use href="#penny-stalk" />
      <use href="#penny-stalk" transform="matrix(-1 0 0 1 200 0)" />

      {/* ONE CENT */}
      <text
        x="100"
        y="103"
        textAnchor="middle"
        fontSize="23"
        fontWeight="700"
        fill="#5a2d12"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        ONE
      </text>
      <text
        x="100"
        y="127"
        textAnchor="middle"
        fontSize="23"
        fontWeight="700"
        fill="#5a2d12"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        CENT
      </text>
    </svg>
  )
}
