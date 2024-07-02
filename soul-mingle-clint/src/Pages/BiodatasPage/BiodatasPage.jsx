import SectionTitel from "../../Shared/SectionTitel/SectionTitel";
import '../../index.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BiodataCard from "../../Component/BiodataCard/BiodataCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner/Spinner";
import Swal from "sweetalert2";
import { Link, useLoaderData } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import useAxiosPublicUrl from "../../Hooks/useAxiosPublicUrl";

const BiodatasPage = () => {
    const axiosPublic = useAxiosPublicUrl();
    const [normalFilterData, setNormalFilterData] = useState();
    const [idSubmit, setIdSubmit] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [bioDataId, setBioDataId] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [activeData, setActiveData] = useState('bioDatas');

    const { count } = useLoaderData();
    const itemPerPage = 6;
    const numberOfPages = Math.ceil(count / itemPerPage)

    // Do the for loop to get the page or 
    // const pages = []
    // for(let i = 0; i < numberOfPages; i++){
    //     pages.push(i)
    // }
    //  Do this array sprading
    const pages = [...Array(numberOfPages).keys()]
    // console.log("pages", pages, numberOfPages);



    const { data: bioDatas = [], isLoading, refetch } = useQuery({
        queryKey: ["bioDatas"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/biodatas?page=${currentPage}&size=${itemPerPage}`);
            return res.data;
        },
    });


    const handleNormalFilter = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const gender = formData.get('gender');
        const location = formData.get('location');
        const age_from = formData.get('age_from');
        const age_to = formData.get('age_to');

        setNormalFilterData({ gender, location, age_from, age_to });
        setFormSubmitted(true);
        setActiveData('normalFilteredBioData')
    };

    const handleAdvanceFilter = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const biodata_ID = parseInt(formData.get('biodata_ID'));
        setBioDataId(biodata_ID);
        setIdSubmit(true)
        setActiveData('filteredId')
        e.target.reset();
    };

    // query for advanced filter data

    const { data: filteredId = {} } = useQuery({
        queryKey: ['dataID'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/filtered/${bioDataId}`);
            return res.data
        },
        enabled: idSubmit,

    })
    // console.log("filterde bio data id is", filteredId);

    if (filteredId.message === "Id did not match") {
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Id did not match",
            showConfirmButton: false,
            timer: 2500
        });
    }



    // query for normal filter data
    const { data: normalFilteredBioData = [] } = useQuery({
        queryKey: ['filteredBioData', normalFilterData],
        queryFn: async () => {
            const params = new URLSearchParams(normalFilterData).toString();
            const res = await axiosPublic.get(`/filter-biodata?${params}`);
            return res.data;
        },
        enabled: formSubmitted,
    });

    useEffect(() => {
        if (idSubmit) {
            setIdSubmit(false);
        }
    }, [idSubmit]);

    // handle prev button for pagination 
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
        refetch()
    }

    // handle NExt button for pagination 
    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
        refetch()
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="py-20">
            <SectionTitel
                title='Find the best for you'
                text='Find the perfect fit for you with our expertly curated selections. Explore now!'>
            </SectionTitel>


            {/* Display data length */}
            {activeData === 'bioDatas' && bioDatas && <h2 className="py-6 text-xl text-center"><span className="theme-color">{count}</span> Biodata Found</h2>}

            {activeData === 'normalFilteredBioData' && normalFilteredBioData && <h2 className="py-6 text-xl text-center"><span className="theme-color">{normalFilteredBioData.length}</span> Biodata Found</h2>}

            {activeData === 'filteredId' && filteredId && <h2 className="py-6 text-xl text-center">Biodata Found for <span className="theme-color">{filteredId.name}</span></h2>}

            <div className=" mt-6 flex flex-col lg:flex-row lg:justify-between gap-5">

                {/* left side */}
                <div className=" w-full md:w-full lg:w-1/4 relative">
                    <div className="bg-white md:px-20 lg:px-0 sticky top-20">

                        <Tabs className="shadow-lg rounded-lg">
                            <TabList className='tab-bg px-2'>
                                <Tab>Normal Filter</Tab>
                                <Tab>Advanced Filter</Tab>
                            </TabList>

                            {/* Normal Filter */}
                            <TabPanel className='p-3 overflow-hidden'>
                                <form onSubmit={handleNormalFilter} className="mt-4 overflow-hidden box-border flex flex-col gap-3">
                                    <select name="gender" required>
                                        <option value="">Biodata Type</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>

                                    <select name="location" required>
                                        <option value="">Division Name</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Sylhet">Sylhet</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Chattagram">Chattagram</option>
                                    </select>

                                    <label>
                                        <span>Age</span>
                                        <div className="mt-3 flex justify-between gap-2">
                                            <input placeholder="Min age 21" className="w-3/5" type="text" name="age_from" required />
                                            <span>To</span>
                                            <input placeholder="Max age 48" className="w-3/5" type="text" name="age_to" required />
                                        </div>
                                    </label>

                                    <button className="mt-3 button">Submit</button>
                                </form>
                            </TabPanel>

                            {/* Advanced Filter */}
                            <TabPanel className='p-3'>
                                <form onSubmit={handleAdvanceFilter} className="mt-4 overflow-hidden box-border flex flex-col gap-3">
                                    <label className="">
                                        <span className="block mb-3">Biodata Id</span>
                                        <input placeholder="find by number" className="w-full" type="number" name="biodata_ID" required />
                                    </label>

                                    <button className="mt-3 button">Submit</button>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>


                {/* right side */}
                <div className="w-full md:w-full lg:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-5">





                    {/* all biodata  */}
                    {activeData === 'bioDatas' && bioDatas && bioDatas.map((item, index) => <BiodataCard key={index} item={item}></BiodataCard>)
                    }

                    {/* Normal filter data */}
                    {
                        activeData === 'normalFilteredBioData' && normalFilteredBioData && normalFilteredBioData.map((item, index) => <BiodataCard key={index} item={item}></BiodataCard>)
                    }

                    {/* advanced filtered biodata */}
                    {activeData === 'filteredId' && filteredId &&
                        <div className="text-xl md:text-base lg:text-base border-2 rounded-lg border-gray-200" >
                            <div className="-z-10 relative bg-[#30384B] w-full  py-20 md:py-12 lg:py-10 text-right rounded-lg">
                                <p className="text-white absolute bottom-1 right-1">Age: {filteredId.age}</p>
                            </div>
                            <div className=" px-2 -mt-20 md:-mt-12 lg:-mt-10 space-y-1 z-10">
                                <img className="z-10 w-3/5 border-4 border-white rounded-full" src={filteredId.profileImage} alt="Members" />

                                <p className="font-semibold">Biodata ID: {filteredId.biodataId}</p>
                                <p className="flex  items-center ">
                                    Permanent Division: {filteredId.permanentDivision}
                                    <FaLocationDot className="text-[#FA4D71]" />
                                </p>


                                <article className="flex justify-start items-center gap-2">
                                    <p>Biodata Type: {filteredId.biodataType}</p>

                                </article>

                                <p >Occupation: {filteredId.occupation}</p>
                            </div>

                            <div className="w-full ml-3 py-4">
                                <Link to='/' >
                                    <button className="py-1 px-2 rounded-lg theme-bg hover:text-[#DBDCDD] ">
                                        Details
                                    </button>
                                </Link>
                            </div>

                        </div>
                    }



                </div>


            </div>

            <div className="w-2/5 pt-10 flex gap-2 mx-auto items-center">
                {/* <p> Current page is: {currentPage}</p> */}
                <button onClick={handlePrev} className="p-2 bg-black text-white rounded-lg">Prev</button>
                {
                    pages.map((btn, index) => <button onClick={() => {
                        setCurrentPage(btn);
                        refetch()
                    }} className={currentPage === btn ? "button" : "btn"} key={index}>{btn}</button>)
                }
                <button onClick={handleNext} className="p-2 bg-black text-white rounded-lg">Next</button>
            </div>
        </div>
    );
};
export default BiodatasPage;