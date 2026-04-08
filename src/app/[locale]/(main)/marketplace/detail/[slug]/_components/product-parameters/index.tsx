"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { getArray } from "@/lib/utils/get-array"
import parse from "html-react-parser"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

const ProductParameters = () => {
    const { data } = useMarketplaceProductQuery()
    const additionalFields = getArray(data?.additional_fields)

    return (
        <main>
            {data?.specification && (
                <div className="mb-7">
                    <h2 className="text-xl font-semibold mb-2">
                        Specifications:
                    </h2>
                    <article className="lg:prose">
                        {parse(data?.specification || "")}
                    </article>
                </div>
            )}
            {data?.additional_fields && (
                <div className="mb-7">
                    <h2 className="text-xl font-semibold mb-2">
                        <ClientTranslate translationKey="additional" />
                    </h2>
                    <table className="w-full">
                        <tbody>
                            {additionalFields.map((item, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className="border-b border-text-100"
                                    >
                                        <td className="w-1/2 pb-2">
                                            {item.field_name}:
                                        </td>
                                        <td className="w-1/2 pb-2">
                                            {item.field_value}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* <hgroup>
                <h3 className="text-lg font-semibold mt-4 mb-4">
                    Destination country
                </h3>
                <div className="flex flex-wrap gap-3 mt-2">
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-gradient-to-r from-blue-600 to-white"></span>{" "}
                        Greece
                    </button>
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-black"></span> Germany
                    </button>
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-blue-300"></span> Iceland
                    </button>
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-green-600"></span> Ireland
                    </button>
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-blue-800"></span> Estonia
                    </button>
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-red-600"></span> Denmark
                    </button>
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-blue-500"></span> Finland
                    </button>
                    <button className="px-6 py-2 bg-[#F3F6FF] text-blue-600 rounded-lg flex items-center gap-1">
                        <span className="w-4 h-3 bg-red-700"></span> Netherlands
                    </button>
                </div>
            </hgroup> */}
        </main>
    )
}

export default ProductParameters
