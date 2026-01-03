export default function RoleInfoHeader({ role, topicsToFocus, questions, lastUpdated, description, experience }) {

    let intExperience = parseInt(experience);
    if (isNaN(intExperience)) {
        intExperience = 0;
    }

    return (
        <div className="flex flex-col items items-start gap-10 px-10">
            <div className="flex flex-col gap-1 items-start justify-start">
                <h1 className="text-black text-3xl font-bold">
                    {role}
                </h1>
                <p className="text-slate-700 text-lg font-medium">{topicsToFocus}</p>
            </div>
            <div className="flex w-2/3 justify-start items-start h-auto gap-8">
                <div className="w-fit h-auto bg-black py-3 px-5 text-center text-white text-sm rounded-full">
                    <h2>{intExperience === 0 ? 'Fresher' : `Experience : ${experience} years`}</h2>
                </div>
                <div className="w-fit h-auto bg-black py-3 px-5 text-center text-white text-sm rounded-full">
                    <h2>{questions.length} Q&A years</h2>
                </div>
                <div className="w-fit h-auto bg-black py-3 px-5 text-center text-white text-sm rounded-full">
                    <h2>Last Updated {lastUpdated}</h2>
                </div>
                <div className="flex items-center justify-center w-2/5 h-82 absolute top-10 right-5 overflow-hidden">
                    <div className="w-16 h-16 bg-green-500 blur-3xl"></div>
                    <div className="w-16 h-16 bg-teal-500 blur-3xl"></div>
                    <div className="w-16 h-16 bg-cyan-500 blur-3xl"></div>
                    <div className="w-16 h-16 bg-fuchsia-500 blur-3xl"></div>
                </div>
            </div>
        </div>
    )
}