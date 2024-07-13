import React, { useState, useEffect } from 'react';
import './FinalOtherLeaveLetter.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import MyCustomFont from '../../assets/Fonts/Roboto-Regular.ttf';
import FontForHeader from '../../assets/Fonts/NotoSansBengali-Regular.ttf';
import letterHeader from '../../components/images/header2.png';
import seal from '../../components/images/seal.png';

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
            <Image src={letterHeader} style={styles.letterHeader} />
            <View style={styles.header}>
                <Text style={styles.headerText}>সূত্র/Ref.: {applicantData.memoNo}</Text>
                <Text style={styles.headerText}>তারিখ / Date: {applicantData.date}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>TO WHOM IT MAY CONCERN</Text>
                <Text style={styles.paragraph}>
                    Professor Benu Kumar Dey, Pro-Vice Chancellor(Academic), University of Chittagong, Bangladesh will get permission from the authority if visa is issued to him to visit India at any time.
                </Text>
            </View>
            <View style={styles.footer}>
                <View>
                    <Text>K.M.Nur Ahmed</Text>
                    <Text>Registrar</Text>
                    <Text>University of Chittagong</Text>
                </View>
                <Image src={seal} style={styles.seal} />
            </View>
        </Page>
    </Document>
);

const FinalOtherLeaveLetter = () => {
    const [applicantData, setApplicantData] = useState({
        memoNo: 'Su-Sha-2388/3787 (Genl)',
        date: '25.04.2024',
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                memoNo: 'Su-Sha-2388/3787 (Genl)',
                date: '25.04.2024',
            };
            setApplicantData(data);
        };

        fetchData();
    }, []);

    return (
        <div className="letter-container">
            <div className="letter-content">
                <img src={letterHeader} alt="Letter Header" className="letter-header" />
                <div className="header">
                    <span className="header-text">সূত্র/Ref.: {applicantData.memoNo}</span>
                    <span className="header-text">তারিখ / Date: {applicantData.date}</span>
                </div>
                <div className="body">
                    <h2 className="title">TO WHOM IT MAY CONCERN</h2>
                    <p className="paragraph">
                        Professor Benu Kumar Dey, Pro-Vice Chancellor(Academic), University of Chittagong, Bangladesh will get permission from the authority if visa is issued to him to visit India at any time.
                    </p>
                </div>
                <div className="footer">
                    <div>
                        <p>K.M.Nur Ahmed</p>
                        <p>Registrar</p>
                        <p>University of Chittagong</p>
                    </div>
                    <img src={seal} alt="Seal" className="seal" />
                </div>
            </div>
            <div className="letter-footer">
                <PDFDownloadLink document={<PdfDocument applicantData={applicantData} />} fileName="PermissionLetter.pdf">
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

export default FinalOtherLeaveLetter;
