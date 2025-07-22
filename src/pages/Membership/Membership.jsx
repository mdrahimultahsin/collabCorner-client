import {FaCrown, FaCheckCircle} from "react-icons/fa";
import {useNavigate} from "react-router";

const Membership = () => {
  const navigate = useNavigate();
  const handlePayment =()=>{
    navigate("/payment")
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-base-200">
      <div className="bg-base-100 shadow-lg rounded-2xl p-8 max-w-lg w-full border border-border-color font-urbanist">
        <div className="text-center">
          <FaCrown className="text-4xl text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-bold mb-2 text-neutral">
            Become a Member
          </h2>
          <p className="text-sm text-secondary-content">
            Unlock full access to CollabCorner by upgrading your membership.
          </p>
        </div>

        <div className="my-6 border-t border-dashed border-border-color"></div>

        <div className="space-y-4 text-base-content">
          <div className="flex items-center gap-3 ">
            <FaCheckCircle className="text-accent" />
            <div className="flex items-center gap-3">
              <FaCrown className="text-yellow-500" />
              <span>Gold Badge awarded</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-accent" />
            <span>Post more than 5 times</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-accent" />
            <span>Priority visibility on posts</span>
          </div>
        </div>

        <div className="my-6 border-t border-dashed border-border-color"></div>

        <div className="text-center">
          <p className="text-xl font-semibold mb-4 text-neutral">
            Only <span className="text-primary font-bold">500৳</span>
          </p>
          <button
            onClick={handlePayment}
            className="cursor-pointer bg-primary hover:bg-[--color-hover-color] text-white py-2.5 px-6 rounded-full font-medium text-sm transition duration-200"
          >
            Pay Now to Become Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
