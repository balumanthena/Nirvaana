import { cn } from "@/lib/utils";

const BaseSvg = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={cn("w-full h-full drop-shadow-sm", className)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {children}
    </svg>
);

export const RetirementIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Sun - Warm Yellow/Orange */}
        <circle cx="20" cy="20" r="14" className="fill-amber-100" />
        <circle cx="20" cy="20" r="8" className="fill-amber-500" />

        {/* Chair - Wood Brown */}
        <path d="M30 70 L30 85 M70 70 L70 85" className="stroke-amber-900 stroke-[3] stroke-linecap-round" />
        <path d="M30 70 H70 V45 Q70 35 60 35 H40 Q30 35 30 45 Z" className="fill-orange-100 stroke-amber-700 stroke-[2]" />
        <path d="M35 70 V45" className="stroke-amber-200" />
        <path d="M45 70 V45" className="stroke-amber-200" />
        <path d="M55 70 V45" className="stroke-amber-200" />
        <path d="M65 70 V45" className="stroke-amber-200" />

        {/* Plants - Vibrant Green */}
        <circle cx="85" cy="40" r="12" className="fill-emerald-100" />
        <path d="M85 52 V85" className="stroke-emerald-600 stroke-[3]" />
        <circle cx="85" cy="55" r="5" className="fill-emerald-500" />
    </BaseSvg>
);

export const GoalIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Sky Circle - Sky Blue */}
        <circle cx="50" cy="50" r="45" className="fill-sky-50" />

        {/* Mountain - Slate/Indigo */}
        <path d="M10 85 L35 35 L60 85" className="fill-slate-300" />
        <path d="M45 85 L70 45 L95 85" className="fill-indigo-300" />

        {/* Flag - Red/danger */}
        <path d="M35 35 L35 15" className="stroke-slate-800 stroke-[2]" />
        <path d="M35 15 L55 22 L35 29" className="fill-rose-500 stroke-rose-600 stroke-[1]" />

        {/* Path - Dashed Line */}
        <path d="M20 85 Q30 70 35 60 Q40 50 35 35" className="stroke-slate-400 stroke-[3] stroke-dasharray-4 4" />
    </BaseSvg>
);

export const RiskIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" /> {/* Emerald-500 */}
                <stop offset="50%" stopColor="#f59e0b" /> {/* Amber-500 */}
                <stop offset="100%" stopColor="#f43f5e" /> {/* Rose-500 */}
            </linearGradient>
        </defs>

        {/* Gauge Background (Track) */}
        <path d="M15 70 A 35 35 0 0 1 85 70" className="stroke-slate-100 stroke-[10] stroke-linecap-round" />

        {/* Gauge Gradient (Value) */}
        <path d="M15 70 A 35 35 0 0 1 85 70" stroke="url(#riskGradient)" className="fill-none stroke-[8] stroke-linecap-round" />

        {/* Ticks/Scale Marks */}
        <path d="M15 70 L10 70" className="stroke-slate-300 stroke-[2]" />
        <path d="M50 35 L50 28" className="stroke-slate-300 stroke-[2]" />
        <path d="M85 70 L90 70" className="stroke-slate-300 stroke-[2]" />

        {/* Needle - Pointing to moderate-high risk */}
        <g className="origin-[50px_70px] rotate-[45deg] transition-transform duration-1000 ease-out hover:rotate-[60deg]">
            <circle cx="50" cy="70" r="6" className="fill-slate-800" />
            <path d="M50 70 L35 70" className="stroke-slate-800 stroke-[4] stroke-linecap-round" />
        </g>
    </BaseSvg>
);

export const InsuranceIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Shield Shape */}
        <path d="M50 15 L20 25 V50 C20 70 50 90 50 90 C50 90 80 70 80 50 V25 L50 15 Z" className="fill-blue-50 stroke-blue-500 stroke-[2]" />

        {/* Inner Protection - Blue Fill */}
        <path d="M50 35 L35 45 V60 H65 V45 L50 35 Z" className="fill-blue-500 stroke-blue-600 stroke-[2]" />

        {/* Tick - White */}
        <path d="M42 50 L48 56 L58 46" className="stroke-white stroke-[3] stroke-linecap-round stroke-linejoin-round" />

        {/* Sparkles - Gold */}
        <path d="M80 20 L82 25 L87 27 L82 29 L80 34 L78 29 L73 27 L78 25 Z" className="fill-amber-400" />
    </BaseSvg>
);

export const EmergencyIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Lifebuoy Ring - Red/White */}
        <circle cx="50" cy="50" r="30" className="stroke-rose-500 stroke-[12]" />
        <circle cx="50" cy="50" r="30" className="stroke-white stroke-[6] stroke-dasharray-25 25" />
        <circle cx="50" cy="50" r="18" className="fill-blue-50" />

        {/* Medical Cross in center - Red */}
        <rect x="45" y="38" width="10" height="24" className="fill-rose-600" rx="2" />
        <rect x="38" y="45" width="24" height="10" className="fill-rose-600" rx="2" />
    </BaseSvg>
);

export const PortfolioIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Pie Chart - Multi-colored */}
        <path d="M45 55 L45 25 A 30 30 0 0 1 75 55 Z" className="fill-violet-500" />
        <path d="M45 55 L75 55 A 30 30 0 0 1 45 85 Z" className="fill-pink-500" />
        <path d="M45 55 L45 85 A 30 30 0 0 1 15 55 Z" className="fill-sky-500" />
        <path d="M45 55 L15 55 A 30 30 0 0 1 45 25 Z" className="fill-emerald-500" />

        {/* Magnifying Glass Overlay */}
        <circle cx="65" cy="35" r="16" className="stroke-slate-800 stroke-[4] fill-white/90" />
        <path d="M76 46 L88 58" className="stroke-slate-800 stroke-[5] stroke-linecap-round" />
    </BaseSvg>
);

export const MutualFundsIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Coins Stack */}
        <ellipse cx="30" cy="75" rx="15" ry="6" className="fill-amber-400 stroke-amber-600 stroke-[2]" />
        <path d="M15 75 V60 C15 65 45 65 45 60 V75" className="fill-amber-300 stroke-amber-600 stroke-[2]" />

        <ellipse cx="30" cy="55" rx="15" ry="6" className="fill-amber-400 stroke-amber-600 stroke-[2]" />
        <path d="M15 55 V40 C15 45 45 45 45 40 V55" className="fill-amber-300 stroke-amber-600 stroke-[2]" />

        <ellipse cx="30" cy="35" rx="15" ry="6" className="fill-amber-400 stroke-amber-600 stroke-[2]" />

        {/* Growth Arrow */}
        <path d="M55 60 L85 30" className="stroke-emerald-500 stroke-[4] stroke-linecap-round" />
        <path d="M85 30 L70 30 M85 30 L85 45" className="stroke-emerald-500 stroke-[4] stroke-linecap-round stroke-linejoin-round" />
    </BaseSvg>
);

export const TermLifeIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Umbrella Canopy */}
        <path d="M15 55 C15 25 30 15 50 15 C70 15 85 25 85 55" className="fill-sky-100 stroke-sky-500 stroke-[3]" />

        {/* Umbrella Ribs */}
        <path d="M50 15 V55 M30 25 V55 M70 25 V55" className="stroke-sky-300 stroke-[1.5] fill-none" />

        {/* Handle */}
        <path d="M50 55 V80 C50 90 60 90 60 80" className="stroke-slate-700 stroke-[4] stroke-linecap-round fill-none" />

        {/* Raindrops (Symbolizing protection from 'rainy day') */}
        <path d="M20 15 L18 20" className="stroke-blue-300 stroke-[2] opacity-50" />
        <path d="M80 15 L82 20" className="stroke-blue-300 stroke-[2] opacity-50" />
    </BaseSvg>
);

export const HealthInsuranceIllustration = ({ className }: { className?: string }) => (
    <BaseSvg className={className}>
        {/* Heart Shape */}
        <path d="M50 85 C50 85 15 60 15 35 C15 20 30 15 45 25 C50 28 50 28 55 25 C70 15 85 20 85 35 C85 60 50 85 50 85 Z" className="fill-rose-50 stroke-rose-500 stroke-[3]" />

        {/* Pulse Line */}
        <path d="M25 45 L35 45 L42 25 L58 65 L65 45 L75 45" className="stroke-rose-600 stroke-[3] stroke-linecap-round stroke-linejoin-round fill-none" />
    </BaseSvg>
);
