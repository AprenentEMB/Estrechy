import { useState } from "react";
import { motion } from "framer-motion";
import { EXERCISES, BODY_PARTS } from "../data/mockData";
import type { Exercise } from "../types";
import { useTheme } from "../hooks/useTheme";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { ExercisePreviewModal } from "./ExercisePreviewModal";

function ExerciseCard({
  exercise,
  index,
  onClick,
}: {
  exercise: Exercise;
  index: number;
  onClick: () => void;
}) {
  const t = useTheme();
  const primaryPart = exercise.bodyParts[0] ?? "neck";
  const accent = t.bodyPartAccent[primaryPart] ?? t.primary;
  const bg = t.bodyPartBg[primaryPart] ?? t.surfaceRaised;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        background: t.surface,
        border: `1px solid ${t.borderSubtle}`,
        borderRadius: 16,
        padding: "14px 14px 12px",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: t.shadowSm,
        transition: "box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = t.cardHoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = t.shadowSm;
      }}
    >
      {/* Thumbnail area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: 10,
          overflow: "hidden",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: accent,
          }}
        />
        {exercise.videoUrl?.endsWith(".svg") ? (
          <img
            src={exercise.videoUrl}
            alt={exercise.name}
            style={{ width: "80%", height: "80%", objectFit: "contain" }}
          />
        ) : (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.5 }}
          >
            <circle cx="12" cy="8" r="3" />
            <path d="M12 11v4m-3 2h6" />
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="4"
              strokeOpacity="0.3"
            />
          </svg>
        )}
        <span
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            background: accent,
            borderRadius: 999,
            padding: "2px 7px",
          }}
        >
          {exercise.duration}s
        </span>
      </div>

      {/* Info */}
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.3,
            marginBottom: 4,
          }}
        >
          {exercise.name}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {exercise.bodyParts.map((part) => (
            <span
              key={part}
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: 999,
                background: t.bodyPartBg[part] ?? t.chipBg,
                color: t.bodyPartAccent[part] ?? t.chipText,
                textTransform: "capitalize",
              }}
            >
              {part.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function AllStretchesView() {
  const t = useTheme();
  const { isMobile, isTablet, isDesktop, isWide } = useBreakpoint();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [preview, setPreview] = useState<Exercise | null>(null);

  // Mobile-first: 2 → 3 → 4 → 5 columns as viewport grows
  const gridColumns = isWide ? 5 : isDesktop ? 4 : isTablet ? 3 : 2;

  // On mobile keep horizontal scroll; on tablet+ let chips wrap
  const filtersWrap = !isMobile;

  const filtered = activeFilter
    ? EXERCISES.filter((e) =>
        e.bodyParts.includes(activeFilter as Exercise["bodyParts"][number]),
      )
    : EXERCISES;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Filter chips */}
      <div
        style={{
          padding: "4px 20px 12px",
          overflowX: filtersWrap ? "visible" : "auto",
          flexShrink: 0,
          scrollbarWidth: "none",
          display: "flex",
          flexWrap: filtersWrap ? "wrap" : "nowrap",
          gap: 8,
        }}
      >
        <button
          onClick={() => setActiveFilter(null)}
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            border: "none",
            background: activeFilter === null ? t.primary : t.chipBg,
            color: activeFilter === null ? "#fff" : t.chipText,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 0.15s",
            boxShadow:
              activeFilter === null ? `0 2px 8px ${t.primaryGlow}` : "none",
          }}
        >
          All
        </button>

        {BODY_PARTS.map((part) => {
          const isActive = activeFilter === part.id;
          const accent = t.bodyPartAccent[part.id] ?? t.primary;
          return (
            <button
              key={part.id}
              onClick={() => setActiveFilter(isActive ? null : part.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "none",
                background: isActive ? accent : t.chipBg,
                color: isActive ? "#fff" : t.chipText,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.15s",
                boxShadow: isActive ? `0 2px 8px ${accent}44` : "none",
                whiteSpace: "nowrap",
              }}
            >
              {part.label}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <div style={{ padding: "0 20px 10px", flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: t.subtle, fontWeight: 600 }}>
          {filtered.length} exercise{filtered.length !== 1 ? "s" : ""}
          {activeFilter
            ? ` · ${BODY_PARTS.find((p) => p.id === activeFilter)?.label}`
            : ""}
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 20px 24px",
          display: "grid",
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: isTablet ? 16 : isDesktop ? 20 : 12,
          alignContent: "start",
        }}
      >
        {filtered.map((exercise, i) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={i}
            onClick={() => setPreview(exercise)}
          />
        ))}
      </div>

      <ExercisePreviewModal
        exercise={preview}
        onClose={() => setPreview(null)}
      />
    </div>
  );
}
