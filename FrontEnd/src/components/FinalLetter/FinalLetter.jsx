import React, { useState, useEffect } from 'react';
import './FinalLetter.css'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer'; // Import Image here
import { saveAs } from 'file-saver';
import MyCustomFont from '../../assets/Fonts/Roboto-Regular.ttf';
import letterHeader from '../../components/images/letterHeader.png';

Font.register({
  family: 'Times-Roman', // Use standard font
  src: 'https://fonts.gstatic.com/s/timesnewroman/v11/glyphicons_halflings.ttf', // URL to a Times New Roman font
});

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: '0.5in', // Adjust the padding to set the margin around the entire page
    fontFamily: 'Times-Roman',
    fontSize: 10, // Decrease the font size
  },
  header: {
    margin: 0, // Remove margin around the header
    textAlign: 'justify', // Align text to justify
    width: '100%', // Ensure the header takes the full width
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
  subject: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center', // Center the subject text
    textDecoration: 'underline', // Underline the subject text
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'justify', // Align text to justify
  },
  letterHeader: {
    width: '100%', // Ensure the image takes the full width
    height: 'auto',
  },
});

const PdfDocument = ({ applicantData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={letterHeader} style={styles.letterHeader} />
      <View style={styles.header}>
        <Text>Memo. No :___________</Text>
        <Text>Sabbir Hasan</Text>
        <Text>Department of Computer Science and Engineering</Text>
        <Text>University of Chittagong</Text>
        <Text>Chittagong, Bangladesh.</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subject}>
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
        <h2>To</h2>
        <p>The Chairman</p>
        <p>University of Chittagong</p>
        <p>Chittagong, Bangladesh</p>
      </div>
      <div className="letter-body">
        <h2>
          Subject: Prayer for issuing study leave to pursue {applicantData.program} at {applicantData.university}, {applicantData.country}
        </h2>
        <p>Dear Sir,</p>
        <p style={{ textAlign: 'justify' }}>
          I, the undersigned, joined the Department of {applicantData.department} at the University of Chittagong as a lecturer on {applicantData.joinDate}. It is my immense pleasure to inform you that I have been offered admission to pursue the {applicantData.program} at {applicantData.university}, {applicantData.country}, starting from {applicantData.startDate}. Along with the admission, I have also been awarded the "{applicantData.scholarship}" which covers my living allowances, registration/training/teaching fees, traveling costs, installation, and visa-related expenses.
        </p>
        <p style={{ textAlign: 'justify' }}>
          To participate in this {applicantData.programDuration} program, it is required to have study leave from the University of Chittagong.
        </p>
        <p style={{ textAlign: 'justify' }}>
          Therefore, I earnestly request you to take necessary steps for issuing me study leave from {applicantData.startDate} and allowing me to join this very important academic program.
        </p>
        <h2>Kind Regards.</h2>
        <p>
          {applicantData.name} <br />
          Lecturer <br />
          Department of {applicantData.department} <br />
          Chittagong, Bangladesh <br />
          University of Chittagong <br />
          Chittagong-4331
        </p>
      </div>
      <div className="letter-footer">
        {/* PDF download link */}
        <PDFDownloadLink document={<PdfDocument applicantData={applicantData} />} fileName="StudyLeaveRequest.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default FinalLetter;
