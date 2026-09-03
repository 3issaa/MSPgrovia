import { User } from "lucide-react";

// Placeholder page — swap the content below with the real design whenever
// it's ready. Kept in the same visual language (bg, rounded-2xl cards) as
// Wallet/Portfolio so the app looks consistent in the meantime.
export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account details
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <User className="h-7 w-7" />
          </span>
          <p className="text-sm text-slate-500">
            Profile page coming soon — send over the design and it'll be built
            here.
          </p>
        </div>
      </div>
    </div>
  );
}
