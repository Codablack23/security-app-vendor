export default function SupplyHistorySection() {
    return (
        <section>
            <p className="text-[rgba(16,24,40,1)] font-semibold text-2xl">Supply History</p>

            <table className="w-full mt-[10px]">
                <thead className="bg-[rgba(47,93,168,1)] text-white" style={{ borderRadius:"10px" }}>
                    <tr className="text-left">
                        <th className="p-4 rounded-tl-xl">
                            <button className="bg-white border-[rgba(224,224,224,1)] h-5 w-5 rounded-md border"></button>
                        </th>
                        <th className="p-4">Date of Supply</th>
                        <th className="p-4">Camp</th>
                        <th className="p-4">Quantity Supplied</th>
                        <th className="p-4">Amount To Supply</th>
                        <th className="p-4">Amount Left To Supply</th>
                        <th className="p-4 rounded-tr-xl">Last Supply Date</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="p-4">
                            <input type="checkbox" />
                        </td>
                        <td className="p-4">2025-07-15</td>
                        <td className="p-4">Camp Alpha</td>
                        <td className="p-4">40</td>
                        <td className="p-4">60</td>
                        <td className="p-4">20</td>
                        <td className="p-4">2025-07-10</td>
                    </tr>
                    {/* Repeat rows as needed */}
                </tbody>
            </table>
        </section>
        )

}