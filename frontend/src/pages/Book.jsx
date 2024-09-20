// src/pages/Book.jsx

import { useState, useEffect } from 'react';

const Book = () => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [amount, setAmount] = useState(0);
    const [count, setCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [ticketDetails, setTicketDetails] = useState('');

    // Initialize seats with random booking status
    useEffect(() => {
        const initialSeats = [];
        for (let i = 0; i < 59; i++) {
            const booked = Math.random() < 0.5;
            initialSeats.push({
                id: i + 1,
                booked,
                selected: false
            });
        }
        setSeats(initialSeats);
    }, []);

    // Handle seat selection
    const handleSeatChange = (id) => {
        setSeats((prevSeats) =>
            prevSeats.map((seat) =>
                seat.id === id
                    ? { ...seat, selected: !seat.selected }
                    : seat
            )
        );

        const seat = seats.find(seat => seat.id === id);
        if (!seat.booked) {
            if (seat.selected) {
                setAmount(amount - 200);
                setCount(count - 1);
                setSelectedSeats(selectedSeats.filter(seatId => seatId !== id));
            } else {
                setAmount(amount + 200);
                setCount(count + 1);
                setSelectedSeats([...selectedSeats, id]);
            }
        }
    };

    // Handle date selection
    const handleDateChange = (event) => {
        setSelectedDate(event.target.id);
    };

    // Handle time selection
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.id);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    // Handle booking
    const handleBooking = () => {
        if (count === 0 || !selectedDate || !selectedTime || !username) {
            alert('Please fill in all required fields.');
            return;
        }

        const details = `
            Name: ${username}
            Number of Seats: ${count}
            Date: ${selectedDate}
            Time: ${selectedTime}
            Total Amount: ${amount}
        `;
        setTicketDetails(details);
        setShowModal(true);
    };

    // Handle printing ticket
    const handlePrint = () => {
        const printContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
            <h2 style="color: #333;">Booking Confirmation</h2>
            <p style="font-size: 18px; margin: 10px 0;">Thank you for your booking!</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Name:</strong> ${username}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Number of Seats:</strong> ${count}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Date:</strong> ${selectedDate}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Time:</strong> ${selectedTime}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Total Amount:</strong> $${amount}</p>
            <p style="font-size: 16px; margin: 5px 0; color: #d9534f;"><strong>Please pay at the counter for your ticket.</strong></p>
            <hr style="border: 1px solid #ccc; margin: 20px 0;" />
            <p style="font-size: 14px; color: #666;">We look forward to seeing you!</p>
        </div>
    `;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<pre>' + printContent + '</pre>');
        printWindow.document.close();
        printWindow.print();
        setShowModal(false);
    };


    return (
        <>
            <br /><br /><br /><br /><br /><div className="center">
                <div className="">
                    <div className="ticket-selector">
                        <div className="head">
                            <label htmlFor="comments">Name </label>
                            <textarea id="comments" name="comments" rows="1" cols="20" placeholder="enter your name" value={username} onChange={handleUsernameChange}></textarea>
                        </div>
                        <h1 className="title">Book a ticket</h1>
                        <div className="seats">
                            <div className="status">
                                <div className="item">Available</div>
                                <div className="item">Booked</div>
                                <div className="item">Selected</div>
                            </div>
                            <div className="all-seats">
                                {seats.map((seat) => (
                                    <div key={seat.id}>
                                        <input
                                            type="checkbox"
                                            id={`s${seat.id}`}
                                            checked={seat.selected}
                                            disabled={seat.booked}
                                            onChange={() => handleSeatChange(seat.id)}
                                        />
                                        <label
                                            htmlFor={`s${seat.id}`}
                                            className={`seat ${seat.booked ? 'booked' : ''} ${seat.selected ? 'selected' : ''}`}
                                        ></label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="timings">
                            <div className="dates">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            name="date"
                                            id={day}
                                            onChange={handleDateChange}
                                        />
                                        <label htmlFor={day} className="dates-item">
                                            <div className="day">{day}</div>
                                            <div className="date">{11 + index}</div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="times">
                                {['11:00', '14:30', '18:00', '21:30'].map((time, index) => (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            name="time"
                                            id={time}
                                            onChange={handleTimeChange}
                                        />
                                        <label htmlFor={time} className="time">
                                            {time}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        <div className="total">
                            <span><span className="count">{count}</span> Tickets</span>
                            <div className="amount">{amount}</div>
                        </div>
                        <button type="button" onClick={handleBooking}>Book</button>
                    </div>
                </div>
            </div>

            {/* Modal for Ticket Confirmation */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Booking Details</h2>
                        <pre>{ticketDetails}</pre>
                        <div className="modal-buttons">
                            <button onClick={handlePrint} className="btn print-btn">Print</button>
                            <button onClick={() => setShowModal(false)} className="btn cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* Ensure modal is on top */
    }
    .modal-content {
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        text-align: center;
        width: 90%;
        max-width: 400px;
    }
    .modal-content h2 {
        margin-bottom: 15px;
        color: #333;
    }
    .modal-content pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 10px 0;
        color: #555;
    }
    .modal-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    .btn {
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s;
    }
    .print-btn {
        background-color: #4CAF50;
        color: white;
    }
    .print-btn:hover {
        background-color: #45a049;
    }
    .cancel-btn {
        background-color: #f44336;
        color: white;
    }
    .cancel-btn:hover {
        background-color: #d32f2f;
    }
`}</style>

        </>
    );
};

export default Book;
