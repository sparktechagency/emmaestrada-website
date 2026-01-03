import { Progress } from "@/components/ui/progress";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SubmitButton from "../ui/website/Campaigns/ChampaignDetails/SubmitButton";
import Container from "./Container";
import { imageUrl } from "@/constants";
import getProfile from "@/utils/getProfile";


const CampaignsDetails = async ({ data }: { data: any }) => {

    const platformIcons: Record<string, string> = {
        TikTok: "/tiktokBlack.png",
        Instagram: "/instagram.png",
        YouTube: "/youtube.png",
    };
    const user = await getProfile();
    return (
        <Container>
            <div className="glassBg p-4 my-10">
                {/* Image */}
                <div className="w-full rounded-2xl overflow-hidden">
                    <img
                        src={`${imageUrl}${data?.thumbnail}`}
                        alt="Feel The Vibe"
                        className="w-full md:w-3/5 h-[250px] mx-auto rounded-2xl"
                    />
                </div>

                {/* Title */}
                <h1 className="text-center text-2xl md:text-3xl font-bold mt-4 text-primary">
                    {data?.title}
                </h1>


                {/* Info Banner */}
                <div className="bg-secondary  shadow-md text-white rounded-xl p-4 mt-4 text-sm text-center">
                    Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.
                </div>

                {/* Paid Out */}
                <div className="mt-6 text-lg font-semibold">Paid Out</div>
                <div className="flex items-end gap-1">
                    <span className="text-3xl font-semibold">$2087.40</span>
                    <span className="text-slate-400  text-xl font-medium">of ${data?.totalPaidOutAmount} paid out</span>
                </div>
                <Progress value={55} className="h-3 mt-2" />
                <div className="p-5 mt-7 glassBg shadow-lg!">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center  items-start ">
                        <div className="text-start">
                            <p className="text-lg pb-1">Reward</p>
                            <span className="text-sm p-1 rounded bg-blue-700 text-white">${data?.budget?.rewardRate} / {data?.budget?.perViews} views</span>
                        </div>
                        <div className="text-start">
                            <p className="text-lg pb-1">Maximum Profit</p>
                            <p className="font-semibold text-lg text-primary">${data?.budget?.maxPayout}</p>
                        </div>
                        <div className="text-start">
                            <p className="text-lg pb-1">Minimum Profit</p>
                            <p className="font-semibold text-lg text-primary">${data?.budget?.minPayout}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="mt-6 text-lg font-semibold">Platforms</div>
                        <div className="flex gap-2 bg-white/50 p-2 rounded-lg">
                            {data?.platforms?.map((platform: string) =>
                                platformIcons[platform] ? (
                                    <Image
                                        key={platform}
                                        src={platformIcons[platform]}
                                        height={20}
                                        width={20}
                                        className="h-5 w-5 object-contain"
                                        alt={platform}
                                    />
                                ) : null
                            )}
                        </div>
                    </div>
                </div>
                <p className="font-semibold  text-2xl mt-7 mb-6">Assets</p>
                <div className="p-5  glassBg shadow-lg! text-blue-600 font-semibold">
                    <a href={data?.assets?.availableContentLink} className="text-wrap">{data?.assets?.availableContentLink}</a>
                </div>

                <p className="font-semibold  text-2xl mt-7 mb-6">Content Requirements</p>
                <div className="p-5  glassBg shadow-lg! text-gray-500 font-semibold flex items-center gap-5">

                    {data?.assets?.contentRequirement && data?.assets?.contentRequirement?.map((item: string) => <span key={item} className="text-xl">{item}</span>)}
                </div>
                <SubmitButton user={user} />

                {/* <div className="flex justify-end mt-5">
                    <Modal
                        dialogTitle="Campaign Form"
                        open={open}
                        setOpen={setOpen}
                        width="900px"
                        height="85vh"
                        dialogTrigger={
                            <button className="btn px-20 text-white bg-blue-700 rounded-full">
                                Submit
                            </button>
                        }
                    >
                        <CampaignSubmitForm closeModal={() => setOpen(false)} setOpenAccVerifyModal={setOpenAccVerifyModal} />
                    </Modal>
                </div> */}
                {/* {!open && !openVerifiedModal && openAccVerifyModal &&
                    <Modal
                        dialogTitle="Link Account"
                        open={openAccVerifyModal}
                        setOpen={setOpenAccVerifyModal}
                        width="700px"                        
                    >
                        <AcccountConnectModal closeModal={() => setOpen(false)} setOpenVerifiedModal={setOpenVerifiedModal} />
                    </Modal>
                } */}
                {/* { openVerifiedModal &&
                    <Modal
                        open={openVerifiedModal}
                        setOpen={setOpenVerifiedModal}
                        width="900px"
                        height="85vh"
                    >
                        <AccountVerified closeModal={() => setOpen(false)} />
                    </Modal>
                } */}
            </div>
        </Container>
    );
}

export default CampaignsDetails;