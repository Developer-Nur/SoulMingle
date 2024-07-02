
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import Spinner from "../../../Shared/Spinner/Spinner";
import useViewBiodata from "../../../Hooks/useViewBiodata";
import "../../../index.css";
import Swal from "sweetalert2";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";


const ViewBiodata = () => {

    const axiosSecure = useAxiosSecureUlr();

    const { biodata, isLoading } = useViewBiodata();


    const {
        biodataId,
        age,
        profileImage,
        name,
        biodataType,
        dateOfBirth,
        expectedPartnerAge,
        expectedPartnerHeight,
        expectedPartnerWeight,
        height,
        occupation,
        fathersName,
        mothersName,
        permanentDivision,
        presentDivision,
        race,
        weight,
        email,
        mobileNumber,
    } = biodata || {};

    const handleMakeBioPremium = () => {
        Swal.fire({
            title: "Are you sure to make your biodata premium?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Premium!"
        }).then((result) => {
            if (result.isConfirmed) {
                const premiumBioInfo = {
                    name, biodataId, email, 
                    age,
                    profileImage,
                    biodataType,
                    dateOfBirth,
                    expectedPartnerAge,
                    expectedPartnerHeight,
                    expectedPartnerWeight,
                    height,
                    occupation,
                    fathersName,
                    mothersName,
                    permanentDivision,
                    presentDivision,
                    race,
                    weight,
                    mobileNumber,
                    isPremium: "pending"
                };
                axiosSecure.post("/premiumBio", premiumBioInfo)
                    .then(res => {
                        const responseMessage = res.data.message;
                        Swal.fire({
                            title: responseMessage,
                            icon: responseMessage === "You have already requested" ? "warning" : "success"
                        });
                    })
                    .catch(error => {
                        console.error("Error:", error.message);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error making your biodata premium.",
                            icon: "error"
                        });
                    });
            }
        });
    };


    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <SectionTitel title="View Biodata" text="Your Comprehensive Profile Overview"></SectionTitel>

            <div className="w-full lg:w-3/4 mx-auto mt-10 overflow-x-auto">
                <img src={profileImage} alt="Profile Image" />
                <h2 className="text-2xl pt-3">Biodata Id: {biodataId}</h2>

                {/* data table */}
                <div className="mt-5 responsive-table">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td>{age}</td>
                            </tr>
                            <tr>
                                <td>Biodata Type:</td>
                                <td>{biodataType}</td>
                            </tr>
                            <tr>
                                <td>Expected Partner Age:</td>
                                <td>{expectedPartnerAge}</td>
                            </tr>
                            <tr>
                                <td>Height:</td>
                                <td>{height}</td>
                            </tr>
                            <tr>
                                <td>Weight:</td>
                                <td>{weight}</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth:</td>
                                <td>{dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td>Fathers Name:</td>
                                <td>{fathersName}</td>
                            </tr>
                            <tr>
                                <td>Mothers Name:</td>
                                <td>{mothersName}</td>
                            </tr>
                            <tr>
                                <td>Occupation:</td>
                                <td>{occupation}</td>
                            </tr>
                            <tr>
                                <td>Race:</td>
                                <td>{race}</td>
                            </tr>
                            <tr>
                                <td>Present Division:</td>
                                <td>{presentDivision}</td>
                            </tr>
                            <tr>
                                <td>Permanent Division:</td>
                                <td>{permanentDivision}</td>
                            </tr>
                            <tr>
                                <td>Expected Partner Height:</td>
                                <td>{expectedPartnerHeight}</td>
                            </tr>
                            <tr>
                                <td>Expected Partner Weight:</td>
                                <td>{expectedPartnerWeight}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>Mobile Number:</td>
                                <td>{mobileNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={handleMakeBioPremium} className="button mt-7">Make biodata to premium</button>
            </div>
        </div>
    );
};

export default ViewBiodata;