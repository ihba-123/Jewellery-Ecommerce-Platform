import { Link } from 'react-router-dom'

const inputClassName =
	'h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition-all duration-200 placeholder:text-white/40 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/15'

const Login = () => {
	return (
		<section className="mx-auto flex min-h-[calc(100dvh-var(--dashboard-topbar-height))] w-full max-w-7xl items-center justify-center px-md py-lg sm:px-lg lg:px-xl">
			<div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-md shadow-[0_20px_55px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-lg">
				<div className="mb-5 border-b border-white/10 pb-4">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5d97c]">Welcome back</p>
					<h1 className="mt-2 font-['Playfair_Display'] text-h2 font-semibold text-white">Login</h1>
					<p className="mt-2 text-sm text-white/72">Access your account and continue shopping.</p>
				</div>

				<form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
					<label className="grid gap-2">
						<span className="text-sm font-medium text-white">Email</span>
						<input type="email" className={inputClassName} />
					</label>

					<label className="grid gap-2">
						<span className="text-sm font-medium text-white">Password</span>
						<input type="password" className={inputClassName} />
					</label>

					<button
						type="submit"
						className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] px-6 text-sm font-semibold text-[#231806] transition-all duration-200 hover:brightness-105"
					>
						Login
					</button>

					<div className="text-center text-sm text-[#6a5f74]">
						New here?{' '}
						<Link to="/signup/customer" className="font-semibold text-[#f5d97c] underline-offset-4 hover:underline">
							Create customer account
						</Link>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Login
