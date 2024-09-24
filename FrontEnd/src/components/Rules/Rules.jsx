import React, { useRef } from 'react';
import { X } from 'lucide-react';

const Rules = ({ onClose }) => {

    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className=" border-solid border-black  fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">

            <div className="mt-0 flex flex-col gap-5 text-white p-6 pt-0  rounded-lg shadow-lg  max-w-4xl w-full h-1/2 overflow-y-auto">
                <button onClick={onClose} className='place-self-end hover:bg-red-700'><X size={20}></X></button>
                <div className='bg-black px-14 pt-2 rounded-lg shadow-lg'>
                    <h1 className="text-3xl font-bold">Summary of Leave Rules at Chittagong University</h1>
                    <div className="space-y-6 text-gray-200">
                        {/* Casual Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">1. Casual Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> Maximum of 15 days in a calendar year.</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Cannot exceed 10 consecutive days.</li>
                                        <li>Should not be taken for more than two consecutive days unless combined with a holiday.</li>
                                        <li>Cannot be combined with any other type of leave.</li>
                                        <li>Treated as on duty and not deducted from the leave account.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Earned Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">2. Earned Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> 28 days per year.</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Can accumulate if not used, but the accumulation has a specific limit.</li>
                                        <li>Cannot exceed a certain number of accumulated days.</li>
                                        <li>Usage is restricted to periods when the employee is on duty.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Quarantine Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">3. Quarantine Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> Up to 21 days per session on full pay.</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Granted due to infectious diseases in the family.</li>
                                        <li>Requires a medical certificate from a certified medical professional.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Disability Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">4. Disability Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> Based on medical certification.</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Granted according to the nature and severity of the disability.</li>
                                        <li>The period of leave may be extended based on medical advice.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Maternity Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">5. Maternity Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> As per medical certification.</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Granted twice during the tenure of service.</li>
                                        <li>Fully paid leave.</li>
                                        <li>Must be reported to the Registrar immediately after being granted.</li>
                                        <li>Additional leave may be granted if medically necessary.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Extraordinary Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">6. Extraordinary Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> Up to 3 years without pay.</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Granted in exceptional cases where no other leave is available.</li>
                                        <li>Should not be granted if the employee can avail of any other type of leave.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Study Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">7. Study Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> Typically not exceeding six months, depending on the nature of the study.</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Granted for pursuing higher education or research.</li>
                                        <li>Requires approval from the competent authority.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Vacation Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">8. Vacation Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Applies to employees entitled to vacations.</li>
                                        <li>If a vacation coincides with a period of leave, the vacation is counted as leave.</li>
                                        <li>Vacation leave counts as duty unless it precedes a period of leave not due.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Leave Not Due */}
                        <section>
                            <h2 className="text-xl font-semibold">9. Leave Not Due</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Up to six months in total during the whole service if on medical certificate.</li>
                                        <li>Ordinarily not exceeding two months (60 days) in a year.</li>
                                    </ul>
                                </li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Granted to University employees holding substantive appointment on full average pay.</li>
                                        <li>Requires medical certification.</li>
                                        <li>Debited from future leave credits.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Medical Leave */}
                        <section>
                            <h2 className="text-xl font-semibold">10. Medical Leave</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>Duration:</strong> Earned at the rate of one-twelfth of the period spent on duty (i.e., 30 days in a year).</li>
                                <li><strong>Conditions:</strong>
                                    <ul className="ml-5 list-decimal list-inside">
                                        <li>Accumulation of medical leave is without limit.</li>
                                        <li>Requires a Medical Certificate from the University’s Chief Medical Officer or a registered medical practitioner.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>


                    </div>
                </div>


            </div>
        </div>
    );
};

export default Rules;