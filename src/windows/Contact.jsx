import { useState } from "react";
import { WindowControls } from "#components";
import { socials, contactDetails } from "#constants";
import WindowWraper from "#hoc/WindowWraper";

const Contact = () => {
  const [copiedId, setCopiedId] = useState(null); // email or phone is copied or not

  const handleOpenContact = async (detail) => {
    try {
      await navigator.clipboard.writeText(detail.value); // write email or phone's value
      setCopiedId(detail.id); // copy email or phone
      // window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // Ignore clipboard issues and still open the contact action.
    }

    window.location.href = detail.href;
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-lg shadow-black/20 lg:flex-row lg:items-start">
          <div className="flex flex-col items-start gap-3">
            <img
              src="/images/kalpesh.jpeg"
              alt="Kalpesh"
              className="w-26 rounded-full border-2 border-slate-700 object-cover shadow-lg"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">
                Let's Connect
              </h3>
              <p className="max-w-md text-sm leading-6 text-slate-300">
                Got an idea? A bug to squash? Or just wanna talk tech? I’m in.
              </p>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-3 lg:max-w-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                Reach me
              </p>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300">
                {copiedId ? "Copied!" : "connect me"}
              </span>
            </div>

            <div className="space-y-2">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const isCopied = copiedId === detail.id;

                return (
                  <button
                    key={detail.id}
                    type="button"
                    onClick={() => handleOpenContact(detail)}
                    className="w-full text-left"
                  >
                    <div
                      className={`rounded-xl bg-gradient-to-right ${detail.accent} 'p-[1px]'`}
                    >
                      <div className="flex items-center justify-between rounded-[11px] bg-slate-950/95 px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-200">
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                              {detail.label}
                            </p>
                            <p className="text-sm font-medium text-white">
                              {detail.value}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">
                          {isCopied ? "Copied" : "Copy"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWraper(Contact, "contact");

export default ContactWindow;
