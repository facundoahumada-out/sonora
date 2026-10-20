export default function logo({ size = 24 }) {
    const iconSize = Math.round(size * 0.58);

    return (
        <span className="flex items-center justify-center rounded-md bg-neutral-900" style={{ width: size, height: size }}>
            <svg className="block" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"aria-hidden="true">
                <path d="M3 8c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
                <path d="M3 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
            </svg>
        </span>
    )
}