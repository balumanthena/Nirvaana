import Link from "next/link";
import { CONFIG } from "@/content/config";

export default function DisclosuresPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                    Regulatory Disclosures
                </h1>
                <p className="text-slate-600 mb-8">
                    Information regarding our SEBI Registration and Grievance Redressal Mechanism.
                </p>

                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-12">
                    <div className="p-6 border-b border-slate-200 bg-slate-50">
                        <h2 className="font-bold text-slate-900">RIA Details</h2>
                    </div>
                    <div className="p-6 space-y-4 text-sm text-slate-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="font-semibold block text-slate-900">Name of the Advisor:</span>
                                {CONFIG.BRAND_NAME} (Proprietorship)
                            </div>
                            <div>
                                <span className="font-semibold block text-slate-900">SEBI Registration Number:</span>
                                {CONFIG.RIA_NUMBER}
                            </div>
                            <div>
                                <span className="font-semibold block text-slate-900">BASL Membership ID:</span>
                                {CONFIG.BASL_ID}
                            </div>
                            <div>
                                <span className="font-semibold block text-slate-900">Address:</span>
                                {CONFIG.CITY}, India.
                            </div>
                            <div>
                                <span className="font-semibold block text-slate-900">Contact:</span>
                                {CONFIG.EMAIL} | {CONFIG.PHONE}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Grievance Redressal</h2>
                    <p className="text-slate-600 mb-4">
                        Client's queries / complaints may be addressed to us at <a href={`mailto:${CONFIG.EMAIL}`} className="text-emerald-600 font-medium">{CONFIG.EMAIL}</a>. We will try to resolve the same within a reasonable timeframe.
                    </p>
                    <p className="text-slate-600 mb-4">
                        If the grievance is not redressed within a reasonable time, you may lodge your complaint online with SEBI at <Link href="https://scores.gov.in" target="_blank" className="text-emerald-600 font-medium underline">SCORES</Link> (SEBI Complaints Redress System).
                    </p>
                    <p className="text-slate-600">
                        You can also use the ODR Portal (Online Dispute Resolution) at <Link href="https://smartodr.in" target="_blank" className="text-emerald-600 font-medium underline">smartodr.in</Link>.
                    </p>
                </div>

                <div className="text-xs text-slate-400">
                    <p>
                        <strong>Disclaimer:</strong> Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL (in case of IAs) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
                    </p>
                </div>
            </div>
        </main>
    );
}
