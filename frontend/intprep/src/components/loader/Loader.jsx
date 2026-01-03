import { LineWave, MutatingDots } from "react-loader-spinner";

export default function Loader({ isLoading }) {
    return (
        <div className="fixed inset-0 bg-black/40 w-full h-full flex items-center justify-center z-40" style={{ display: isLoading ? 'flex' : 'none' }}>
            <div className="w-full h-full flex items-center justify-center ml-10  my-auto">
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#000000"
                    secondaryColor="#fca919"
                    radius="15.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="scale-120"
                />
            </div>
        </div >
    )
}

export function SpinLoader({ isLoading }) {
    return (
        <div className="w-fit h-fit scale-150 -mt-5" style={{ display: isLoading ? 'flex' : 'none' }}>
            <LineWave
                visible={true}
                height="50"
                width="50"
                color="#fca919"
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
            />
        </div >
    )
}
