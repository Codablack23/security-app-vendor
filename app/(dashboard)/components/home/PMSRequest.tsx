export default function PMSRequestOption(){
    return (
        <div className="bg-white border space-y-5 rounded-xl border-[rgba(220,224,228,1)] p-7">
            <header className="flex items-center text-[rgba(116,118,119,1)]">
                <p>Total PMS Supplied</p>
                <div className="flex items-center  justify-center h-5 ml-auto w-5 rounded-full text-white bg-red-400 font-semibold">
                    <p>2</p>
                </div>
                <button className="ml-auto rounded-lg flex items-center gap-x-5 px-[10px] py-3">
                    <span><i className="bi bi-chevron-right"></i></span>
                </button>
            </header>
        </div>
    )
}