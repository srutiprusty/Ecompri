import React from 'react'

const Step = () => {
    return (
        <div>
            {/* You can add more components or content here */}
            <section id="how-it-works" className="relative z-10 px-6 py-20 ">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-center text-white-800 mb-8">
                            Simple as{" "}
                            <span className=" bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent">
                                1-2-3
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                step: "01",
                                title: "Search & Scan",
                                desc: "Enter any product name or paste a shopping URL from any platform",
                            },
                            {
                                step: "02",
                                title: "Compare & Analyze",
                                desc: "Our App scans various platforms instantly and analyzes price trends",
                            },
                            {
                                step: "03",
                                title: "Save & Shop",
                                desc: "Get the best deal with verified prices and guaranteed savings",
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-24 h-24 bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white shadow-xl group-hover:rotate-12">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27]  bg-clip-text transition-colors duration-300 text-white-800">
                                    {item.title}
                                </h3>
                                <p className="text-white-600 group-hover:text-red-600 transition-colors duration-300 leading-relaxed max-w-xs mx-auto">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Step
