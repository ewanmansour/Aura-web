import { Lock } from "lucide-react";

export default function LoginForm({
  username,
  password,
  loginError,
  onUsernameChange,
  onPasswordChange,
  onSubmit
}) {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-28">
      <div className="glass-panel w-full max-w-md rounded-xl p-8 shadow-soft">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 rounded-full bg-aura-cream/10 p-3 text-aura-blush">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-display text-3xl text-white">Aura Admin</h1>
          <p className="text-sm text-aura-blush">Please log in to manage your space</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-aura-cream/75">
              Username
            </label>
            <input
              type="text"
              required
              className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white placeholder:text-aura-cream/45"
              placeholder="Enter username"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-aura-cream/75">
              Password
            </label>
            <input
              type="password"
              required
              className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white placeholder:text-aura-cream/45"
              placeholder="Enter password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </div>

          {loginError && (
            <p className="rounded-md bg-red-500/15 p-2.5 text-sm text-red-200">{loginError}</p>
          )}

          <button
            type="submit"
            className="aura-focus mt-2 w-full rounded-md bg-aura-cream px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-aura-olive transition hover:bg-aura-deep hover:text-aura-cream"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
