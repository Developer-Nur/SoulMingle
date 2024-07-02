import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecureUlr from '../../Hooks/useAxiosSecureUlr';
import Spinner from '../../Shared/Spinner/Spinner';
import BiodataCard from '../BiodataCard/BiodataCard';
import { FaLocationDot } from 'react-icons/fa6';
import useUserInfo from '../../Hooks/useUserInfo';
import Swal from 'sweetalert2';
import { useEffect } from 'react';



const BiodataDetails = () => {
    const { user, setRequestInfo } = useUserInfo();
    const { id } = useParams();
    const axiosSecure = useAxiosSecureUlr();

    const biodataIdIs = parseInt(id)

    const { data: biodata = {}, isLoading, } = useQuery({
        queryKey: ["biodatadetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bioData/${biodataIdIs}`)
            return res.data
        }
    })

    const { data: premium = {}, isLoading: premiumLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/premium-users/${user.email}`)
            return res.data
        }
    });

    const isPremium = premium?.isPremium === "premium" && true;

    // console.log("lets see", isPremium);

    const { findSimilarType, foundId } = biodata || {};

    // console.log("tutututu " , foundId);

    // Handle Add To Favourites
    const handleAddToFavourites = id => {
        const FavouritesInfo = {
            email: user?.email,
            biodataId: id
        }

        axiosSecure.post("/favourite-biodats", FavouritesInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Add to your favourite list",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (res.data.message === "Already added to your favorite list") {
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Already added to your favorite list",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "failed to Add!",
                showConfirmButton: false,
                timer: 1500
            }))
    }



    // Request Contact Information

    useEffect(() => {
        const requestedContactInfo = {
            userEmail: user.email,
            biodataId: parseInt(id),
        }

        setRequestInfo(requestedContactInfo)
    }, [setRequestInfo, user.email, id])


    if (isLoading || premiumLoading) {
        return <Spinner />
    }



    return (
        <div>
            {/* Biodata details */}
            <div className='py-10 w-full grid grid-cols-1 lg:grid-cols-4 gap-3'>
                <figure className='col-span-1 space-y-2'>
                    <img className='w-[250px] text-center rounded-2xl border-4 border-[#FA4D71]' src={foundId.profileImage} alt="Profile Image" />
                    <figcaption className='mt-5 text-xl'>Biodata ID: <span className='theme-color'>{foundId.biodataId}</span> </figcaption>
                    <div className='space-y-2'>
                        <h4 className='text-xl'>Race: {foundId.race}</h4>
                        <h4 className='text-xl flex  items-center'><FaLocationDot className="text-[#FA4D71]" />Division: {foundId.permanentDivision}</h4>
                    </div>

                </figure>

                <div className='col-span-3 pink-bg lg:mt-40 shadow-xl rounded-lg p-7'>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4'>

                        <div className='border-l-2 border-[#FA4D71] pl-4 space-y-3'>
                            <h4 className='text-xl'>Biodata Type: <span className="accent-color">{foundId.biodataType}</span> </h4>

                            <h4 className='text-xl'>Name: <span className="accent-color">{foundId.name}</span> </h4>
                            <h4 className='text-xl'>Date Of Birth: <span className="accent-color">{foundId.dateOfBirth}</span></h4>
                            <h4 className='text-xl'>Height: <span className="accent-color">{foundId.height}</span></h4>


                        </div>

                        <div className='border-l-2 border-[#FA4D71] pl-4 space-y-3'>
                            <h4 className='text-xl'>Weight: <span className="accent-color">{foundId.weight}</span></h4>
                            <h4 className='text-xl'>Occupation: <span className="accent-color">{foundId.occupation}</span></h4>
                            <h4 className='text-xl'>Fathers Name: <span className="accent-color">{foundId.fathersName}</span></h4>
                            <h4 className='text-xl'>Mothers Name: <span className="accent-color">{foundId.mothersName}</span></h4>


                        </div>

                        <div className='border-l-2 border-[#FA4D71] pl-4 space-y-3'>
                            <h4 className='text-xl'>Present Division: <span className="accent-color">{foundId.presentDivision}</span></h4>
                            <h4 className='text-xl'>Expected Partner Age: <span className="accent-color">{foundId.expectedPartnerAge}</span></h4>
                            <h4 className='text-xl'>Expected Partner Height: <span className="accent-color">{foundId.expectedPartnerHeight}</span></h4>
                            <h4 className='text-xl'>Expected Partner Weight: <span className="accent-color">{foundId.expectedPartnerWeight}</span></h4>



                        </div>
                    </div>

                    {isPremium &&
                        <div className='space-y-3 p-4 mt-5'>
                            <h4 className='text-xl text-center'>Contact Info:</h4>
                            <hr />
                            <h4 className='text-xl'>Phone:
                                <span className="accent-color ml-2">{foundId.mobileNumber}</span>
                            </h4>
                            <h4 className='text-xl flex  items-center'>Email:
                                <span className="accent-color ml-2"> {foundId.email}</span>
                            </h4>
                        </div>
                    }

                    <div className='mt-16 flex justify-start items-center gap-5'>
                        <button onClick={() => handleAddToFavourites(foundId.biodataId)} className='button'>
                            Add to favourites
                        </button>

                        {!isPremium && <Link to="/dashboard/payment">
                            <button className='button'>
                                Request Information
                            </button>
                        </Link>}

                    </div>






                </div>
            </div>

            {/* similar biodata types */}
            <div className='my-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-7'>

                {
                    findSimilarType && findSimilarType.map((item, index) => <BiodataCard key={index} loading={isLoading} item={item} > </BiodataCard>)
                }

            </div>
        </div>
    );
};

export default BiodataDetails;