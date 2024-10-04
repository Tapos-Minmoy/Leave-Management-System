import React, { useState, useEffect } from 'react';
import './LetterToRegistrar.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import MyCustomFont from '../../assets/Fonts/Roboto-Regular.ttf';
import FontForHeader from '../../assets/Fonts/NotoSansBengali-Regular.ttf';
import letterHeader from '../../components/images/header2.png';
import seal from '../../components/images/seal.png';
const base_url = import.meta.env.VITE_API_URL;
Font.register({
    family: 'Roboto-Regular',
    src: MyCustomFont,
});
Font.register({
    family: 'NotoSansBengali-Regular',
    src: FontForHeader,
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: '1in',
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    headerText: {
        fontFamily: 'NotoSansBengali-Regular',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textDecoration: 'underline',
    },
    body: {
        marginBottom: 20,
        textAlign: 'justify',
    },
    footer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paragraph: {
        marginBottom: 10,
        textAlign: 'justify',
        whiteSpace: 'pre-wrap',
    },
    letterHeader: {
        width: '100%',
        height: 'auto',
        marginBottom: 20,
    },
    seal: {
        width: 100,
        height: 'auto',
        marginLeft: 10,
    },
});

const PdfDocument = ({ applicantData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.body}>
                <Text style={styles.paragraph}>
                    To The Registrar,{'\n'}
                    University of Chittagong,{'\n'}
                    Chittagong, Bangladesh.
                </Text>
                <Text style={styles.paragraph}>
                    Through: Chairman, Department of Computer Science and Engineering, University of Chittagong.
                </Text>
                <Text style={styles.paragraph}>
                    Subject: Prayer for issuing study leave to pursue Master's Degree Program in Harvard University, United States.
                </Text>
                <Text style={styles.paragraph}>
                    Dear Sir,
                </Text>
                <Text style={styles.paragraph}>
                    I, the undersigned, joined the Department of Computer Science and Engineering in University of Chittagong as a lecturer on {applicantData.joiningDate}. It is my immense pleasure to inform you that I have been offered admission to pursue a Master's Degree Program at Harvard University, United States starting from {applicantData.programStartDate}. Along with the admission, I have also been awarded the "Chittagong University Welfare Fund," which covers my living allowances, registration/training/teaching fees, travelling cost, installation and visa related cost. To participate in this 1-year program, it is required to have study leave from the University of Chittagong.
                </Text>
                <Text style={styles.paragraph}>
                    Therefore, I earnestly request you to take necessary steps for issuing me study leave from {applicantData.leaveStartDate} and letting me join this very important academic program.
                </Text>
                <Text style={styles.paragraph}>
                    Kind Regards,
                </Text>
                <Text style={styles.paragraph}>
                    Farhana Sultana,{'\n'}
                    Lecturer,{'\n'}
                    Department of Computer Science and Engineering,{'\n'}
                    University of Chittagong,{'\n'}
                    Chittagong-4331,{'\n'}
                    Bangladesh.
                </Text>
            </View>
            <View style={styles.footer}>
                <View>
                    <Text>Comments from Chairman:</Text>
                    <Text>1.</Text>
                </View>
            </View>
        </Page>
    </Document>
);

const LetterToRegistrar = () => {
    const [applicantData, setApplicantData] = useState({
        memoNo: 'Su-Sha-2388/3787 (Genl)',
        date: '25.04.2024',
        joiningDate: '2023-06-09',
        programStartDate: '2023-07-08',
        leaveStartDate: '2023-07-08',
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                memoNo: 'Su-Sha-2388/3787 (Genl)',
                date: '25.04.2024',
                joiningDate: '2023-06-09',
                programStartDate: '2023-07-08',
                leaveStartDate: '2023-07-08',
            };
            setApplicantData(data);
        };

        fetchData();
    }, []);

    return (
        <div className="letter-container">
            <div className="letter-content">
                <div className="body">
                    <p className="paragraph">
                        To The Registrar,{'\n'}
                        University of Chittagong,{'\n'}
                        Chittagong, Bangladesh.
                    </p>
                    <p className="paragraph">
                        Through: Chairman, Department of Computer Science and Engineering, University of Chittagong.
                    </p>
                    <p className="paragraph">
                        Subject: Prayer for issuing study leave to pursue Master's Degree Program in Harvard University, United States.
                    </p>
                    <p className="paragraph">
                        Dear Sir,
                    </p>
                    <p className="paragraph">
                        I, the undersigned, joined the Department of Computer Science and Engineering in University of Chittagong as a lecturer on {applicantData.joiningDate}. It is my immense pleasure to inform you that I have been offered admission to pursue a Master's Degree Program at Harvard University, United States starting from {applicantData.programStartDate}. Along with the admission, I have also been awarded the "Chittagong University Welfare Fund," which covers my living allowances, registration/training/teaching fees, travelling cost, installation and visa related cost. To participate in this 1-year program, it is required to have study leave from the University of Chittagong.
                    </p>
                    <p className="paragraph">
                        Therefore, I earnestly request you to take necessary steps for issuing me study leave from {applicantData.leaveStartDate} and letting me join this very important academic program.
                    </p>
                    <p className="paragraph">
                        Kind Regards,
                    </p>
                    <p className="paragraph">
                        Farhana Sultana,<br />
                        Lecturer,<br />
                        Department of Computer Science and Engineering,<br />
                        University of Chittagong,<br />
                        Chittagong-4331,<br />
                        Bangladesh.
                    </p>
                </div>
                <div className="footer">
                    <div>
                        <p>Comments from Chairman:</p>
                        <p>1.</p>
                    </div>
                </div>
            </div>
            <div className="letter-footer">
                <PDFDownloadLink document={<PdfDocument applicantData={applicantData} />} fileName="StudyLeaveLetter.pdf">
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

export default LetterToRegistrar;
