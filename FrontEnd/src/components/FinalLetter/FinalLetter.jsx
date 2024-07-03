import React, { useState, useEffect } from 'react';
import './FinalLetter.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import MyCustomFont from '../../assets/Fonts/Roboto-Regular.ttf';
import letterHeader from '../../components/images/letterHeader.png';

Font.register({
    family: 'Roboto-Regular',
    src: MyCustomFont,
});

// Define styles for PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: '1in', // Adjust the padding to set the margin
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
    },
    header: {
        marginBottom: 40,
        textAlign: 'justify', // Align text to justify
    },
    body: {
        marginBottom: 40,
        textAlign: 'justify', // Align text to justify
    },
    footer: {
        marginTop: 40,
        textAlign: 'justify', // Align text to justify
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'justify', // Align text to justify
    },
    paragraph: {
        marginBottom: 20,
        textAlign: 'justify', // Align text to justify
    },
    letterHeader: {
        width: '100%',
        height: 'auto',
    },
});

const PdfDocument = ({ applicantData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image src={letterHeader} style={styles.letterHeader} />
            <View style={styles.header}>
                <Text>Memo. No :</Text>
                <Text>Sabbir Hasan</Text>
                <Text>Department of Computer Science and Engineering</Text>
                <Text>University of Chittagong</Text>
                <Text>Chittagong, Bangladesh.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>
                    Subject: Prayer for issuing study leave to pursue {applicantData.program} at {applicantData.university}, {applicantData.country}
                </Text>
                <Text>Dear Sir,</Text>
                <Text style={styles.paragraph}>
                    I, the undersigned, joined the Department of {applicantData.department} at the University of Chittagong as a lecturer on {applicantData.joinDate}. It is my immense pleasure to inform you that I have been offered admission to pursue the {applicantData.program} at {applicantData.university}, {applicantData.country}, starting from {applicantData.startDate}. Along with the admission, I have also been awarded the "{applicantData.scholarship}" which covers my living allowances, registration/training/teaching fees, traveling costs, installation, and visa-related expenses.
                </Text>
                <Text style={styles.paragraph}>
                    To participate in this {applicantData.programDuration} program, it is required to have study leave from the University of Chittagong.
                </Text>
                <Text style={styles.paragraph}>
                    Therefore, I earnestly request you to take necessary steps for issuing me study leave from {applicantData.startDate} and allowing me to join this very important academic program.
                </Text>
                <Text style={styles.title}>Kind Regards.</Text>
                <Text>
                    {applicantData.name} {'\n'}
                    Lecturer {'\n'}
                    Department of {applicantData.department} {'\n'}
                    Chittagong, Bangladesh {'\n'}
                    University of Chittagong {'\n'}
                    Chittagong-4331
                </Text>
            </View>
        </Page>
    </Document>
);

const FinalLetter = () => {
    const [applicantData, setApplicantData] = useState({
        name: 'Shajidul Islam',
        department: 'Computer Science and Engineering',
        joinDate: '2023-06-09',
        program: "Master's Degree Program",
        university: 'Harvard University',
        country: 'United States',
        startDate: '2023-07-08',
        scholarship: 'Chittagong University Welfare Fund',
        programDuration: '1-year',
    });

    // Simulate fetching data from the database
    useEffect(() => {
        const fetchData = async () => {
            // Replace with actual API call
            const data = {
                name: 'Shajidul Islam',
                department: 'Computer Science and Engineering',
                joinDate: '2023-06-09',
                program: "Master's Degree Program",
                university: 'Harvard University',
                country: 'United States',
                startDate: '2023-07-08',
                scholarship: 'Chittagong University Welfare Fund',
                programDuration: '1-year',
            };
            setApplicantData(data);
        };

        fetchData();
    }, []);

    return (
        <div className="letter-container">
            <div className="letter-header">
                <label>
                    Memo No:
                    <input
                        className="px-1 bg-transparent border-b-[2px] appearance-none"
                    />
                </label>
                <br />
                <br />
                <p>Sabbir Hasan</p>
                <p>Teacher</p>
                <p>Department of Computer Science and Engineering</p>
                <p>University of Chittagong</p>
                <p>Chittagong, Bangladesh</p>
                <br />
                <p>Dated: 2023-03-01</p>
            </div>
            <div className="letter-body">
                <h2>
                    <u>Subject: Grant of Study Leave and Release Order</u>
                </h2>
                <p>Dear Sir/Madam,</p>
                <p style={{ textAlign: 'justify' }}>
                    With reference to your application dated 2023-03-02 on the above mentioned subject, I am directed to inform you
                    that you have been granted Study Leave on full average pay for 4 year, with effect from 2023-04-08 for your
                    study towards PhD Program at the UK_U, UK and that you have been released from the University with effect
                    from 2023-04-08 for the purpose.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    Further I am directed to inform you that in pursuance of the authority delegated from the office of the Hon'ble
                    Prime Minister Government of the People's Republic of Bangladesh vide Memo. No.
                    <input className="px-1 bg-transparent border-b-[2px] appearance-none" />
                    dated
                    <input className="px-1 bg-transparent border-b-[2px] appearance-none" /> (copy enclosed), the Vice-Chancellor has been pleased to allow you to proceed to UK for the
                    purpose.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    Further, I am directed to inform you that 10 (ten) percent of your Monthly Basic Pay to be drawn by you during
                    the period of your Study Leave for the above mentioned purpose will be deposited in the Chittagong University
                    Account and that the total amount, so deposited, will be refunded to you according to the terms & conditions of
                    the Service Bond executed by you with this University.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    The University of Chittagong or the Govt. of Bangladesh will have no financial responsibilities for your proposed
                    study in UK.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    In this regard, I would request you to apply along with the consents of the Surety Holders who signed in the
                    Surety Bond at the time of your going on Study Leave, 03(three) months before expiry of the above leave, in
                    case you need extension of your leave, that will depend upon Satisfactory Progress Report from your Course
                    Supervisor, Opinion of the Departmental (CU) Planning Committee OR to return from abroad and join your duties
                    at this University within 2027-04-08. You should also take prior permission from this University for any change of
                    Course/ Field of Study or Institution, along with proper documents.
                </p>
                <br />
                <p>Thanking you,</p>
                <p>Yours Sincerely,</p>
               
               <h2 style={{ textAlign: 'justify' }}>Register</h2>
               <p>
                   University of Chittagong <br />
               </p>

           </div>
           <div className="letter-footer">
               {/* PDF download link */}
               <PDFDownloadLink document={<PdfDocument applicantData={applicantData} />} fileName="StudyLeaveRequest.pdf">
                   {({ blob, url, loading, error }) => (
                       <button className="pdf-download-button">
                           {loading ? 'Loading document...' : 'Download PDF'}
                       </button>
                   )}
               </PDFDownloadLink>
          
            </div>
        </div>
    );
};

export default FinalLetter;
