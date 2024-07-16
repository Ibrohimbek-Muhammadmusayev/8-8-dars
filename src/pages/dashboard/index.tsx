import { Flex, Progress } from "antd";
import Kalendar from "../../components/calendar";
import Rating from "../../components/statistika";
import Topimages from "../../components/images";

export default function Dashboard(){
    return (
        <div className="w-full">
            <div className="">
                <Topimages/>
            </div>
            <div className="flex justify-between mt-[30px]">
                <div className="">
                    <Rating/>
                    <Flex gap="small" vertical>
                        <Progress percent={30} />
                        <Progress percent={50} status="active" />
                        <Progress percent={70} status="exception" />
                        <Progress percent={100} />
                        <Progress percent={50} showInfo={false} />
                    </Flex>
                </div>
                <div className="">
                    <Kalendar/>
                </div>
            </div>
        </div>
    )
} 