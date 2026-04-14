import { create } from "zustand"

interface FirstMessageSlugState {
    marketplaceSlug: string | null
    investmentSlug: string | null
    outreachHubSlug: string | null
    setMarketplaceSlug: (marketplaceSlug: string | null) => void
    setInvestmentSlug: (investmentSlug: string | null) => void
    setOutreachHubSlug: (outreachHubSlug: string | null) => void
    clearSlug: () => void
}

export const useFirstMessageSlugStore = create<FirstMessageSlugState>(
    (set) => ({
        marketplaceSlug: null,
        investmentSlug: null,
        outreachHubSlug: null,
        setMarketplaceSlug: (marketplaceSlug) => set({ marketplaceSlug }),
        setInvestmentSlug: (investmentSlug) => set({ investmentSlug }),
        setOutreachHubSlug: (outreachHubSlug) => set({ outreachHubSlug }),
        clearSlug: () => {
            set({ marketplaceSlug: null })
            set({ investmentSlug: null })
            set({ outreachHubSlug: null })
        },
    }),
)
