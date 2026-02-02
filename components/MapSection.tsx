"use client";

export default function MapSection() {
    return (
        <section className="h-[60vh] relative w-full overflow-hidden bg-slate-900 border-t border-slate-800">
            <div className="absolute inset-0 grayscale contrast-125 opacity-70">
                {/* Embed Placeholder Google Map (Simulated Dark Mode via CSS filter) */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f7f1f84!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1645492123456!5m2!1sen!2sau"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen={true}
                    loading="lazy"
                ></iframe>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-12 left-6 md:left-24 z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">GLOBAL HQ</h2>
                <p className="text-slate-400 max-w-sm font-mono text-sm">
                    4040 North Fairfax Drive,<br />
                    Suite 300, Arlington,<br />
                    Virginia 22203
                </p>
            </div>
        </section>
    );
}
