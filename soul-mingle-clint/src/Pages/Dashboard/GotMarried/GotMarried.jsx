import Swal from "sweetalert2";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import { useForm } from "react-hook-form"


const GotMarried = () => {

    const axiosSecure = useAxiosSecureUlr();

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = data => {
        const reviewDataIs = {
            seflId: parseInt(data.seflId),
            partnerId: parseInt(data.partnerId),
            ratting: parseInt(data.ratting),
            image: data.profileImage,
            story: data.story,
            marriageDate: data.date
        }

        axiosSecure.post("/reviews", reviewDataIs)
            .then(res => {
                if (res.data?.insertedId) {
                    reset()
                    Swal.fire("Thanks for sharing");
                }
            })
            .catch(error => Swal.fire("Try again later please"))
    }




    return (
        <div>
            <SectionTitel title="Got Married" text="Celebrated Our Union in Love and Joy"></SectionTitel>


            <div className="w-full md:w-3/4 lg:w-4/5 mx-auto mt-10">
                <h2 className="pl-2 border-[#FA4D71] border-l-2 text-xl">Share your story with us</h2>

                <form className="mt-10  grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>

                    <div >
                        <label className="block mb-2">Profile Image</label>
                        <input placeholder="URL" className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="text" {...register('profileImage', { required: 'Profile Image is required' })} />
                        {errors.profileImage && <p className="text-red-500">{errors.profileImage.message}</p>}
                    </div>

                    <div >
                        <label className="block mb-2">Self Biodata id</label>
                        <input placeholder="Self Biodata Id" className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="number" {...register('seflId', { required: 'Self Biodata id is required' })} />
                        {errors.seflId && <p className="text-red-500">{errors.seflId.message}</p>}
                    </div>

                    


                    <div >
                        <label className="block mb-2">Partner Biodata Id</label>
                        <input placeholder="Partner Biodata Id" className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="number" {...register('partnerId', { required: 'Partner Biodata id is required' })} />
                        {errors.partnerId && <p className="text-red-500">{errors.partnerId.message}</p>}
                    </div>


                    <div >
                        <label className="block mb-2">Ratting</label>
                        <input placeholder="out of 5" className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="number" {...register('ratting', { required: 'Partner Biodata id is required' })} />
                        {errors.ratting && <p className="text-red-500">{errors.ratting.message}</p>}
                    </div>
                    
                    <div >
                        <label className="block mb-2">Marriage Date</label>
                        <input placeholder="out of 5" className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="date" {...register('date', { required: 'Partner Biodata id is required' })} />
                        {errors.date && <p className="text-red-500">{errors.ratting.date}</p>}
                    </div>

                    <div >
                        <label className="block mb-2">Share your Feelings</label>
                        <textarea placeholder="Story" className="w-full rounded border-[#c3c3c3] focus:border-pink-500" type="text" {...register('story', { required: 'Partner Biodata id is required' })} />
                        {errors.story && <p className="text-red-500">{errors.story.message}</p>}
                    </div>





                    <button className="button mt-8">Submit</button>
                </form>

            </div>

        </div>
    );
};

export default GotMarried;