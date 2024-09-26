// // Membership.js
// import React, { useState } from 'react';
// // import { useHistory } from 'react-router-dom';
// import './Membership.css'; // Adjust the path if needed

// const Membership = () => {
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const history = useHistory();

//     const plans = [
//         {
//             title: 'Basic Plan',
//             price: 1000 * 100, // Price in smallest currency unit
//             benefits: ['Access to gym equipment', 'Free group classes'],
//         },
//         {
//             title: 'Monthly Plan',
//             price: 2500 * 100,
//             benefits: ['All Basic Plan benefits', 'Access to premium classes'],
//         },
//         {
//             title: 'Ultimate Plan',
//             price: 5000 * 100,
//             benefits: ['All Monthly Plan benefits', 'Personal training sessions'],
//         },
//         {
//             title: 'Fitness Enthusiast Plan',
//             price: 3500 * 100,
//             benefits: ['All Monthly Plan benefits', 'Access to special workshops', 'Nutritional guidance'],
//         },
//         {
//             title: 'Family Plan',
//             price: 8000 * 100,
//             benefits: ['All Ultimate Plan benefits', 'Family workout sessions', 'Discounted rates for additional members'],
//         },
//         {
//             title: 'Annual Plan',
//             price: 25000 * 100,
//             benefits: ['All Ultimate Plan benefits', 'Free entry to all special events', '2 complimentary guest passes per month'],
//         },
//     ];

//     const handlePlanSelect = (plan) => {
//         setSelectedPlan(plan);
//         // Navigate to the form page with the selected plan
//         history.push('/user-details', { plan });
//     };

//     return (
//         <div className="membership-container">
//             <h1 className="membership-title">Choose Your Membership Plan</h1>
//             <div className="membership-plans">
//                 {plans.map((plan, index) => (
//                     <div key={index} className="membership-plan">
//                         <h2 className="plan-title">{plan.title}</h2>
//                         <p className="plan-price">{plan.price / 100} RS</p>
//                         <ul className="plan-benefits">
//                             {plan.benefits.map((benefit, idx) => (
//                                 <li key={idx} className="benefit-item">{benefit}</li>
//                             ))}
//                         </ul>
//                         <button onClick={() => handlePlanSelect(plan)} className="btn-signup">Subscribe</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Membership;




// Membership.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Mmhd.css'; // Adjust the path if needed

const Mmhd = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const plans = [
        {
            title: 'Monthly Plan',
            price: 1000 * 100, // Price in the smallest currency unit
            benefits: ['Access to gym equipment', 'Free group classes'],
        },
        {
            title: '4 Month Plan',
            price: 3000 * 100,
            benefits: ['All Monthly plan benefits'],
        },
        {
            title: '6 Month Plan',
            price: 4000 * 100,
            benefits: ['All Monthly Plan benefits', 'Supersaver pack'],
        },
        {
            title: 'Fitness Enthusiast Plan',
            price: 3500 * 100,
            benefits: ['All Monthly Plan benefits',  'Personal training sessions', 'Nutritional guidance'],
        },
        {
            title: 'Family Plan',
            price: 8000 * 100,
            benefits: ['All Monthly Plan benefits', 'Family workout sessions', 'Discounted rates for additional members'],
        },
        {
            title: 'Annual Plan',
            price: 9000 * 100,
            benefits: ['All Monthly Plan benefits'],
        },
    ];

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        // Navigate to the form page with the selected plan
        // navigate('/user-details', { state: { plan } }); // Use navigate to route to user details page with state
        navigate('/login')
    };

    return (
        <div className="membership-container">
            <h1 className="membership-title">Choose Your Membership Plan</h1>
            <div className="membership-plans">
                {plans.map((plan, index) => (
                    <div key={index} className="membership-plan">
                        <h2 className="plan-title">{plan.title}</h2>
                        <p className="plan-price">{plan.price / 100} RS</p>
                        <ul className="plan-benefits">
                            {plan.benefits.map((benefit, idx) => (
                                <li key={idx} className="benefit-item">{benefit}</li>
                            ))}
                        </ul>
                        <button onClick={() => handlePlanSelect(plan)} className="btn-signup">Subscribe</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mmhd;
