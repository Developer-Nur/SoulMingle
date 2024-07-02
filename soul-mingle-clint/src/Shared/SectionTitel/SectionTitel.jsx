import '../../index.css'


// eslint-disable-next-line react/prop-types
const SectionTitel = ({ title, text }) => {
    return (
        <div className='text-center space-y-3 w-4/5 md:w-3/5 lg:w-2/5 mx-auto'>
            <h2 className='text-xl md:text-2xl lg:text-4xl font-semibold border-y-2 border-[#532B79] py-3'>{title}</h2>
            <p className='text'>{text}</p>
        </div>
    );
};

export default SectionTitel;