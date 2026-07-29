import {
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white/80 px-4 py-2 text-sm font-medium text-[#2563EB] shadow-sm">
              <Sparkles size={16} />
              AI-powered campus experience
            </div>

            <h1 className="mt-8 text-5xl font-bold tracking-tight text-[#111827] sm:text-6xl">
              Campus<span className="text-[#2563EB]">OS</span>.AI
            </h1>

            <p className="mt-6 text-xl leading-8 text-[#6B7280] sm:text-2xl">
              The AI operating system for modern campuses.
            </p>

            <p className="mt-4 max-w-xl text-lg leading-8 text-[#6B7280]">
              Streamline academics, attendance, placements, study planning, and
              productivity from one elegant workspace.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button onClick={onGetStarted} className="gap-2">
                Get Started
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary">Explore Features</Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#2563EB]" />
                Smart AI assistant
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#2563EB]" />
                Unified student portal
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden border-[#E5E7EB]/80 p-0 shadow-[0_30px_90px_-20px_rgba(37,99,235,0.25)]">
              <div className="bg-gradient-to-br from-[#EAF2FF] via-[#F7F9FF] to-[#EDF7FF] p-8">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-[#2563EB] p-4 text-white shadow-lg">
                    <GraduationCap size={32} />
                  </div>
                  <div className="rounded-full border border-[#E5E7EB] bg-white/70 px-3 py-1 text-sm font-medium text-[#6B7280]">
                    Live • 24/7
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-[#111827]">
                      Attendance
                    </p>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      AI-driven insights in one tap.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-[#111827]">
                      Placements
                    </p>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      Track opportunities effortlessly.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl bg-white p-6 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-[#2563EB]/10 p-2 text-[#2563EB]">
                      <BrainCircuit size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">
                        AI Study Coach
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Personalized plans for every semester.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 w-full rounded-full bg-[#E5E7EB]">
                    <div className="h-2 w-4/5 rounded-full bg-[#2563EB]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;