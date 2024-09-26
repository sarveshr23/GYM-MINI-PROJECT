// import React, { useState } from 'react';
// // import QRCode from 'qrcode.react';
// import './Payment.css'; // Ensure you have relevant styles for your payment options

// const Payment = () => {
//     const [showQRCode, setShowQRCode] = useState(false);
//     const qrValue = "https://your-payment-link.com"; // Replace with your actual payment link

//     const handleOptionChange = (option) => {
//         if (option === 'qr') {
//             setShowQRCode(true);
//         } else if (option === 'upi') {
//             setShowQRCode(false);
//         }
//     };

//     return (
//         <div className="payment-container">
//             <h2>Select Payment Method</h2>
//             <div className="payment-options">
//                 <button onClick={() => handleOptionChange('upi')}>UPI Payment</button>
//                 <button onClick={() => handleOptionChange('qr')}>Scan QR Code</button>
//             </div>

//             {showQRCode ? (
//                 <div className="qr-code">
//                     <h3>Scan this QR code to make the payment</h3>
//                     <QRCode value={qrValue} size={256} />
//                 </div>
//             ) : (
//                 <div className="upi-info">
//                     <h3>UPI Payment Instructions</h3>
//                     <p>Please use your UPI app to complete the payment using the provided details.</p>
//                     {/* You can add additional instructions or UPI details here */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Payment;
import React, { useState } from 'react';
import './Payment.css'; // Ensure you have relevant styles for your payment options
import qr from '../public/qr.png'
const Payment = () => {
    const [showQRCode, setShowQRCode] = useState(false);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);

    const qrValue = "https://www.google.com/imgres?q=qr%20code%20payment%20link&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fd%2Fd0%2FQR_code_for_mobile_English_Wikipedia.svg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FQR_code&docid=VO6MX2dtclzMgM&tbnid=AUAfJ9S28UM6kM&vet=12ahUKEwjM-uKVy62IAxVi2TgGHQuKIAYQM3oECFUQAA..i&w=296&h=296&hcb=2&ved=2ahUKEwjM-uKVy62IAxVi2TgGHQuKIAYQM3oECFUQAA"; // Replace with your actual payment link

    const upiUrl = `upi://pay?pa=sarvesh20122004@oksbibank&pn=VarshaMani&am=100&cu=INR`; // Example UPI link

    // Generate a QR code using Google Chart API or another service
    const qrCodeUrl = `https://chart.googleapis.com/chart?chs=256x256&cht=qr&chl=${encodeURIComponent(upiUrl)}`;

    const handleOptionChange = (option) => {
        if (option === 'qr') {
            setShowQRCode(true);
        } else if (option === 'upi') {
            setShowQRCode(false);
        }
        setShowPaymentOptions(true);
    };

    return (
        <div className="payment-container">
            <h2>Select Payment Method</h2>
            <div className="payment-options">
                <button onClick={() => handleOptionChange('upi')}>UPI Payment</button>
                <button onClick={() => handleOptionChange('qr')}>Scan QR Code</button>
            </div>

            {showPaymentOptions && (
                showQRCode ? (
                    <div className="qr-code">
                        <h3>Scan this QR code to make the payment</h3>
                        {/* Display the generated QR code image */}
                        <img src={qr} alt="QR Code" />
                    </div>
                ) : (
                    <div className="upi-info">
                        <h3>UPI Payment Instructions</h3>
                        <p>Please use your UPI app to complete the payment using the provided details:</p>
                        <p>UPI ID: sarvesh20122004@oksbi</p>
                        {/* <p>Amount: ₹100</p> */}
                    </div>
                )
            )}
        </div>
    );
};

export default Payment;
