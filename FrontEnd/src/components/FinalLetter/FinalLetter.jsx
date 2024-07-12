import React, { useState, useEffect } from 'react';
import './FinalLetter.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
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
      fontSize: 11,
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
  });

const PdfDocument = ({ applicantData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image src={letterHeader} style={styles.letterHeader} />
            <View style={styles.header}>
                <Text>Memo No: {applicantData.memoNo}</Text>
                <Text>{applicantData.name}</Text>
                <Text>{applicantData.position}</Text>
                <Text>{applicantData.department}</Text>
                <Text>{applicantData.university}</Text>
                <Text>{applicantData.location}</Text>
                <Text>Dated: {applicantData.date}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>
                    Subject: Grant of Study Leave and Release Order
                </Text>
                <Text style={styles.paragraph}>Dear Sir/Madam,</Text>
                <Text style={styles.paragraph}>
                    With reference to your application dated {applicantData.applicationDate} on the above-mentioned subject, I am directed to inform you that you have been granted Study Leave on full average pay for 4 years, with effect from {applicantData.startDate} for your study towards PhD Program at {applicantData.universityName}, {applicantData.country} and that you have been released from the University with effect from {applicantData.startDate} for this purpose.
                </Text>
                <Text style={styles.paragraph}>
                    Further, I am directed to inform you that in pursuance of the authority delegated from the office of the Hon'ble Prime Minister Government of the People's Republic of Bangladesh vide Memo. No. {applicantData.memoNoPrime} dated {applicantData.memoDate} (copy enclosed), the Vice-Chancellor has been pleased to allow you to proceed to {applicantData.country} for this purpose.
                </Text>
                <Text style={styles.paragraph}>
                    Additionally, 10 percent of your Monthly Basic Pay during the period of your Study Leave will be deposited in the Chittagong University Account and the total amount will be refunded to you according to the terms & conditions of the Service Bond executed by you with this University.
               The University of Chittagong or the Govt. of Bangladesh will have no financial responsibilities for your proposed study in {applicantData.country}.
                </Text>
                <Text style={styles.paragraph}>
                    I request you to apply, along with the consents of the Surety Holders who signed in the Surety Bond at the time of your going on Study Leave, three months before the expiry of the above leave if you need an extension. The extension will depend on a Satisfactory Progress Report from your Course Supervisor, the Opinion of the Departmental (CU) Planning Committee, or you may return from abroad and join your duties at this University by {applicantData.endDate}. Prior permission from this University is required for any change of Course/Field of Study or Institution, along with proper documents.
                </Text>
                <Text style={styles.paragraph}>Thanking you,</Text>
                <Text style={styles.paragraph}>Yours Sincerely,</Text>
                <Text>Register</Text>
                <Text>University of Chittagong</Text>
            </View>
        </Page>
    </Document>
);

const FinalLetter = () => {
    const [applicantData, setApplicantData] = useState({
        memoNo: '1234',
        name: 'Sabbir Hasan',
        position: 'Teacher',
        department: 'Department of Computer Science and Engineering',
        university: 'University of Chittagong',
        location: 'Chittagong, Bangladesh',
        date: '2023-03-01',
        applicationDate: '2023-03-02',
        startDate: '2023-04-08',
        universityName: 'UK_U',
        country: 'UK',
        memoNoPrime: '',
        memoDate: '',
        endDate: '2027-04-08',
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                memoNo: '1234',
                name: 'Sabbir Hasan',
                position: 'Teacher',
                department: 'Department of Computer Science and Engineering',
                university: 'University of Chittagong',
                location: 'Chittagong, Bangladesh',
                date: '2023-03-01',
                applicationDate: '2023-03-02',
                startDate: '2023-04-08',
                universityName: 'UK_U',
                country: 'UK',
                memoNoPrime: '',
                memoDate: '',
                endDate: '2027-04-08',
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
                        value={applicantData.memoNo}
                        onChange={(e) => setApplicantData({ ...applicantData, memoNo: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <p>{applicantData.name}</p>
                <p>{applicantData.position}</p>
                <p>{applicantData.department}</p>
                <p>{applicantData.university}</p>
                <p>{applicantData.location}</p>
                <br />
                <p>Dated: {applicantData.date}</p>
            </div>
            <div className="letter-body">
                <h2>
                    <u>Subject: Grant of Study Leave and Release Order</u>
                </h2>
                <p>Dear Sir/Madam,</p>
                <p style={{ textAlign: 'justify' }}>
                    With reference to your application dated {applicantData.applicationDate} on the above-mentioned subject, I am directed to inform you that you have been granted Study Leave on full average pay for 4 years, with effect from {applicantData.startDate} for your study towards PhD Program at {applicantData.universityName}, {applicantData.country} and that you have been released from the University with effect from {applicantData.startDate} for this purpose.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    Further, I am directed to inform you that in pursuance of the authority delegated from the office of the Hon'ble Prime Minister Government of the People's Republic of Bangladesh vide Memo. No.
                    <input
                        className="px-1 bg-transparent border-b-[2px] appearance-none"
                        value={applicantData.memoNoPrime}
                        onChange={(e) => setApplicantData({ ...applicantData, memoNoPrime: e.target.value })}
                    />
                    dated
                    <input
                        className="px-1 bg-transparent border-b-[2px] appearance-none"
                        value={applicantData.memoDate}
                        onChange={(e) => setApplicantData({ ...applicantData, memoDate: e.target.value })}
                    /> (copy enclosed), the Vice-Chancellor has been pleased to allow you to proceed to {applicantData.country} for this purpose.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    Additionally, 10 percent of your Monthly Basic Pay during the period of your Study Leave will be deposited in the Chittagong University Account and the total amount will be refunded to you according to the terms & conditions of the Service Bond executed by you with this University.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    The University of Chittagong or the Govt. of Bangladesh will have no financial responsibilities for your proposed study in {applicantData.country}.
                </p>
                <br />
                <p style={{ textAlign: 'justify' }}>
                    I request you to apply, along with the consents of the Surety Holders who signed in the Surety Bond at the time of your going on Study Leave, three months before the expiry of the above leave if you need an extension. The extension will depend on a Satisfactory Progress Report from your Course Supervisor, the Opinion of the Departmental (CU) Planning Committee, or you may return from abroad and join your duties at this University by {applicantData.endDate}. Prior permission from this University is required for any change of Course/Field of Study or Institution, along with proper documents.
                </p>
                <br />
                <p>Thanking you,</p>
                <p>Yours Sincerely,</p>
                <br />
                <h2 style={{ textAlign: 'justify' }}>Register</h2>
                <p>University of Chittagong</p>
            </div>
            <div className="letter-footer">
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
