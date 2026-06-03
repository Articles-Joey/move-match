import { Suspense } from "react"
import PageContent from "./index"

export const metadata = {
    title: `Move Match`,
}

export default function Page() {
    return (
        <Suspense>
            <PageContent />
        </Suspense>
    )
}