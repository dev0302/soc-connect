import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function getStrength(pw) {
  let score = 0;
  if (!pw) return { score: 0, label: "", color: "" };
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = {
    0: { label: "", color: "" },
    1: { label: "Very Weak", color: "#ef4444" },
    2: { label: "Weak", color: "#f97316" },
    3: { label: "Fair", color: "#eab308" },
    4: { label: "Good", color: "#84cc16" },
    5: { label: "Strong", color: "#22c55e" },
  };
  return { score, ...map[score] };
}

export default function PasswordField({ value, onChange, label, placeholder = "••••••••", id }) {
  const [show, setShow] = useState(false);
  const strength = getStrength(value);
  const bars = 5;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} *
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-11 rounded-xl bg-[#1e1e30] border border-white/10 text-white placeholder-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          required
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Strength meter */}
      {value && (
        <div className="mt-2">
          <div className="flex gap-1 mb-1">
            {Array.from({ length: bars }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full transition-all duration-300"
                style={{
                  background: i < strength.score ? strength.color : "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </div>
          {strength.label && (
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium" style={{ color: strength.color }}>
                {strength.label}
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 justify-end">
                {[
                  { label: "8+ chars", ok: value.length >= 8 },
                  { label: "A-Z", ok: /[A-Z]/.test(value) },
                  { label: "a-z", ok: /[a-z]/.test(value) },
                  { label: "0-9", ok: /[0-9]/.test(value) },
                  { label: "#@!", ok: /[^A-Za-z0-9]/.test(value) },
                ].map(({ label: l, ok }) => (
                  <span key={l} className={`text-[10px] transition-colors ${ok ? "text-emerald-400" : "text-gray-600"}`}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
