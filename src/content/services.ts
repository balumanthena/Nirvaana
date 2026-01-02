import {
    RetirementIllustration,
    GoalIllustration,
    RiskIllustration,
    InsuranceIllustration,
    EmergencyIllustration,
    PortfolioIllustration
} from '@/components/shared/Illustrations';

export const SERVICES = [
    {
        id: 'retirement-planning',
        title: 'Retirement Planning',
        shortDescription: 'Secure your golden years with a stress-tested corpus calculation and withdrawal strategy.',
        fullDescription: 'We help you answer "How much is enough?" with precision. Our retirement planning service considers inflation, life expectancy, medical costs, and your lifestyle aspirations to build a robust corpus. We don\'t just plan for the accumulation phase, but also design a tax-efficient withdrawal strategy for your post-retirement years.',
        icon: RetirementIllustration,
        slug: 'retirement-planning'
    },
    {
        id: 'goal-based-investing',
        title: 'Goal-based Investing',
        shortDescription: 'Align your portfolio with life goals like buying a home, kids’ education, or world travel.',
        fullDescription: 'Investments should have a purpose. We map your portfolio to specific life milestones. Whether it’s funding your child’s higher education, buying a dream home, or taking that world tour, we create separate buckets for each goal with appropriate asset allocation and risk management.',
        icon: GoalIllustration,
        slug: 'goal-based-investing'
    },
    {
        id: 'risk-profiling',
        title: 'Risk Profiling',
        shortDescription: 'Understand your true risk appetite and align your investments accordingly.',
        fullDescription: 'Risk isn\'t just a questionnaire. It\'s about your ability and willingness to take loss. We conduct a deep-dive psychometric and financial risk profiling to understand where you stand. This ensures you never lose sleep over market volatility.',
        icon: RiskIllustration,
        slug: 'risk-profiling'
    },
    {
        id: 'insurance-adequacy',
        title: 'Insurance Analysis',
        shortDescription: 'Unbiased review of your Life and Health insurance needs.',
        fullDescription: 'Are you under-insured or over-insured? We analyze your human life value and health risks to recommend the right cover. Since we don\'t sell insurance, our advice is purely in your interest—focused on protection, not premiums.',
        icon: InsuranceIllustration,
        slug: 'insurance-adequacy'
    },
    {
        id: 'emergency-fund',
        title: 'Emergency Planning',
        shortDescription: 'Build a safety net for life\'s unannounced curveballs.',
        fullDescription: 'Before you invest, you must be secure. We help you calculate and park an adequate emergency fund that is liquid, safe, and easily accessible, ensuring that your long-term investments remain undisturbed during short-term crises.',
        icon: EmergencyIllustration,
        slug: 'emergency-fund'
    },
    {
        id: 'portfolio-review',
        title: 'Portfolio Review',
        shortDescription: 'Second opinion on your existing investments. Cut clutter, reduce costs.',
        fullDescription: 'Sitting on a pile of random mutual funds and stocks? We declutter your portfolio, weed out underperformers, optimize costs (switch to Direct plans), and realign everything to your financial goals.',
        icon: PortfolioIllustration,
        slug: 'portfolio-review'
    }
];
