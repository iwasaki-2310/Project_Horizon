import ChairGroup from '@/Components/Office/ChairGroup';
import Pod from '@/Components/Office/Pod';
import Layouts from '@/Layouts/Layouts';
import OfficeLayout from '@/Layouts/OfficeLayout';
import {
    Box,
    Flex,
    Heading,
    Image,
    Link,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

const OfficeTop = ({ office }) => {

    // このページのみBodyタグにoverfro-hiddenを付与
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return() => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [])
    const officeImagePath = '/img/office';
    return (
        <>
            <Head>
                <meta name="body-class" content="overflow-hidden" />
            </Head>
            <OfficeLayout officeName={office.office_name}>
                <Flex flexWrap="wrap" justifyContent="space-between" px={5}>
                    <Pod>
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                        <Image src={`${officeImagePath}/table.svg`} py={1} />
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                        <Image src={`${officeImagePath}/table.svg`} py={1} />
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                        <Image src={`${officeImagePath}/table.svg`} py={1} />
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                        <Image src={`${officeImagePath}/table.svg`} py={1} />
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                        <Image src={`${officeImagePath}/table.svg`} py={1} />
                        <ChairGroup>
                            <Image src={`${officeImagePath}/chair.svg`} w="50px" />
                            <Image src={`${officeImagePath}/chair.svg`} />
                            <Image src={`${officeImagePath}/chair.svg`} />
                        </ChairGroup>
                    </Pod>
                </Flex>

            </OfficeLayout>
        </>
    );
};

export default OfficeTop;
