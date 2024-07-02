import { useForm } from "react-hook-form";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import "../../../index.css"
import useUserInfo from "../../../Hooks/useUserInfo";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";
import Swal from "sweetalert2";


const EditBiodata = () => {

    const { user } = useUserInfo();
    const axiosSecure = useAxiosSecureUlr();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        data.age = parseInt(data.age);
        data.expectedPartnerAge = parseInt(data.expectedPartnerAge);
        data.expectedPartnerHeight = parseInt(data.expectedPartnerHeight);
        data.expectedPartnerWeight = parseInt(data.expectedPartnerWeight);
        data.mobileNumber = parseInt(data.mobileNumber);
        data.weight = parseInt(data.weight);
        data.height = parseInt(data.height);
        // console.log(data);

        // post a bio-data info to server
        axiosSecure.post("/create-biodata", data)
            .then(res => {
                // console.log(res);
                if (res.data.result?.insertedId) {
                    Swal.fire(`Added Successfully, Your Biodata Id: ${res.data.biodataId}`);
                } else {
                    Swal.fire(`${res.data}`);
                }
                reset()
            })
            .catch(error => {
                // console.log(error.message)
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    };

    return (
        <div>
            <SectionTitel title="Edit Bio-data" text="Craft Your Profile, Revise and Shine"></SectionTitel>

            {/* form */}
            <div className="shadow-lg px-2 py-10 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  items-center gap-5 p-2 md:px-16 lg:px-36 ">

                    <div>
                        <label className="block mb-2">Biodata Type</label>
                        <select className="w-full rounded border-[#c3c3c3] focus:border-pink-500" {...register('biodataType', { required: 'Biodata Type is required' })}>
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.biodataType && <p className="text-red-500">{errors.biodataType.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Name</label>
                        <input className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="text" {...register('name', { required: 'Name is required' })} />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div >
                        <label className="block mb-2">Profile Image</label>
                        <input placeholder="URL" className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="text" {...register('profileImage', { required: 'Profile Image is required' })} />
                        {errors.profileImage && <p className="text-red-500">{errors.profileImage.message}</p>}
                    </div>

                    <div >
                        <label className="block mb-2">Date of Birth</label>
                        <input className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="date" {...register('dateOfBirth', { required: 'Date of Birth is required' })} />
                        {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Height</label>
                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('height', { required: 'Height is required' })}>
                            <option value="">Select...</option>
                            <option value="4">4 feet</option>
                            <option value="5">5 feet</option>
                            <option value="6">6 feet</option>
                            <option value="5">7 feet</option>
                        </select>
                        {errors.height && <p className="text-red-500">{errors.height.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Weight</label>
                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('weight', { required: 'Weight is required' })}>
                            <option value="">Select...</option>
                            <option value="40">40 KG</option>
                            <option value="50">50 KG</option>
                            <option value="60">60 KG</option>
                            <option value="70">70 KG</option>
                            <option value="80">80 KG</option>
                            <option value="90">90 KG</option>
                        </select>
                        {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Age</label>
                        <input className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" type="number" {...register('age')} />
                        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Occupation</label>
                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('occupation', { required: 'occupation is required' })}>
                            <option value="">Select...</option>
                            <option value="student">Student</option>
                            <option value="job">Job</option>
                            <option value="business">Business</option>
                            <option value="others">Others</option>
                        </select>
                        {errors.occupation && <p className="text-red-500">{errors.occupation.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Race</label>
                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('race', { required: 'Race is required' })}>
                            <option value="">Select...</option>
                            <option value="Asian">Asian</option>
                            <option value="Black or African American">Black or African American</option>
                            <option value="Hispanic or Latino">Hispanic or Latino</option>
                            <option value="Native American or Alaska Native">Native American or Alaska Native</option>
                            <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                            <option value="White">White</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.race && <p className="text-red-500">{errors.race.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Father Name</label>
                        <input className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" type="text" {...register('fathersName', { required: 'Father Name is required' })} />
                        {errors.fathersName && <p className="text-red-500">{errors.fathersName.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Mother Name</label>
                        <input className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" type="text" {...register('mothersName', { required: 'Mother Name is required' })} />
                        {errors.mothersName && <p className="text-red-500">{errors.mothersName.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Permanent Division</label>
                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('permanentDivision', { required: 'Permanent Division is required' })}>
                            <option value="">Select...</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattagram">Chattagram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Maymansign">Maymansign</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                        {errors.permanentDivision && <p className="text-red-500">{errors.permanentDivision.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Present Division</label>
                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('presentDivision', { required: 'Present Division is required' })}>
                            <option value="">Select...</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattagram">Chattagram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Maymansign">Maymansign</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                        {errors.presentDivision && <p className="text-red-500">{errors.presentDivision.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Expected Partner Age</label>
                        <input className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" type="number" {...register('expectedPartnerAge', { required: 'Expected Partner Age is required' })} />

                        {errors.expectedPartnerAge && <p className="text-red-500">{errors.expectedPartnerAge.message}</p>}

                    </div>

                    <div>
                        <label className="block mb-2">Expected Partner Height</label>

                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('expectedPartnerHeight', { required: 'Partner Height is required' })}>
                            <option value="">Select...</option>
                            <option value="4">4 feet</option>
                            <option value="5">5 feet</option>
                            <option value="6">6 feet</option>
                            <option value="5">7 feet</option>
                        </select>
                        {errors.expectedPartnerHeight && <p className="text-red-500">{errors.expectedPartnerHeight.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Expected Partner Weight</label>

                        <select className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" {...register('expectedPartnerWeight', { required: 'Partner Weight is required' })}>
                            <option value="">Select...</option>
                            <option value="40">40 KG</option>
                            <option value="50">50 KG</option>
                            <option value="60">60 KG</option>
                            <option value="70">70 KG</option>
                            <option value="80">80 KG</option>
                            <option value="90">90 KG</option>
                        </select>
                        {errors.expectedPartnerWeight && <p className="text-red-500">{errors.expectedPartnerWeight.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Email</label>
                        <input defaultValue={user.email} className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="email" {...register('email', { required: 'Email is required' })} readOnly />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Mobile Number</label>
                        <input className="w-full  rounded border-[#c3c3c3] focus:border-pink-500" type="number" {...register('mobileNumber', { required: 'Mobile Number is required' })} />
                        {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
                    </div>

                    <div className="space-x-4">
                        <button className="button" type="submit">Save And Publish Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBiodata;