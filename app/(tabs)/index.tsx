import CalendarComponent from '@/components/calendar';
import JobList, { Job } from '@/components/job-list';
import { theme } from '@/constants/theme';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [selectedJob, setSelectedJob] = useState<Job[]>(jobsList[0]);

  const handleDateSelect = (date: string) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    console.log('Selected date:', date);
    if (date === today) {
      setSelectedJob(jobsList[0]);
    } else {
      setSelectedJob(jobsList[1]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <CalendarComponent onDateSelect={handleDateSelect} />
        <JobList
          jobs={selectedJob}
          onInfoPress={(job) => console.log('Info pressed for job:', job)}
          onSecondActionPress={(job) =>
            console.log('Second action pressed for job:', job)
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const jobsList: Job[][] = [
  [
    {
      id: '1',
      description: 'Απεντόμωση σε εξωτερικό χώρο',
      status: 'Ολοκληρωμένη',
      type: 'Home',
      price: 50,
      time: '14:30',
      address: 'Λεωφ. Κηφισίας 45, Αθήνα',
      details:
        'Η απεντόμωση θα γίνει σε εξωτερικό χώρο, με χρήση οικολογικών προϊόντων. Η διάρκεια της εργασίας εκτιμάται σε 2 ώρες.',
    },
    {
      id: '2',
      description: 'Καθαρισμός καναπέ',
      status: 'Ακυρωμένη',
      type: 'Professional',
      price: 30,
      time: '10:00',
      address: 'Πλ. Συντάγματος 12, Αθήνα',
      details:
        'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
    },
    {
      id: '3',
      description: 'Καθαρισμός καναπέ',
      status: 'Σε εκκρεμότητα',
      type: 'Professional',
      price: 30,
      time: '16:00',
      address: 'Οδός Ερμού 50, Αθήνα',
      details:
        'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
    },
    {
      id: '4',
      description: 'Καθαρισμός καναπέ',
      status: 'Σε εκκρεμότητα',
      type: 'Professional',
      price: 30,
      time: '11:30',
      address: 'Οδός Σταδίου 35, Αθήνα',
      details:
        'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
    },
  ],
  [
    {
      id: '1',
      description: 'Καθαρισμός κρεβατιού',
      status: 'Σε εκκρεμότητα',
      type: 'Home',
      price: 50,
      time: '14:30',
      address: 'Λεωφ. Κηφισίας 45, Αθήνα',
      details:
        'Ο καθαρισμός του κρεβατιού θα γίνει με χρήση οικολογικών προϊόντων. Η διάρκεια της εργασίας εκτιμάται σε 2 ώρες.',
    },
    {
      id: '2',
      description: 'Καθαρισμός λομπι ξενοδοχείου',
      status: 'Σε εκκρεμότητα',
      type: 'Professional',
      price: 30,
      time: '10:00',
      address: 'Πλ. Συντάγματος 12, Αθήνα',
      details:
        'Ο καθαρισμός του λομπι του ξενοδοχείου θα γίνει με ειδικά καθαριστικά προϊόντα',
    },
    {
      id: '3',
      description: 'Καθαρισμός καναπέ',
      status: 'Σε εκκρεμότητα',
      type: 'Professional',
      price: 30,
      time: '16:00',
      address: 'Οδός Ερμού 50, Αθήνα',
      details:
        'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
    },
    {
      id: '4',
      description: 'Καθαρισμός καναπέ',
      status: 'Σε εκκρεμότητα',
      type: 'Professional',
      price: 30,
      time: '11:30',
      address: 'Οδός Σταδίου 35, Αθήνα',
      details:
        'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
    },
    {
      id: '5',
      description: 'Καθαρισμός μπαλκονιού',
      status: 'Σε εκκρεμότητα',
      type: 'Professional',
      price: 30,
      time: '14:30',
      address: 'Οδός Σταδίου 35, Αθήνα',
      details:
        'Ο καθαρισμός του μπαλκονιού θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
    },
    {
      id: '6',
      description: 'Καθαρισμός κρεβατιού',
      status: 'Σε εκκρεμότητα',
      type: 'Professional',
      price: 30,
      time: '15:30',
      address: 'Οδός Σταδίου 35, Αθήνα',
      details:
        'Ο καθαρισμός του κρεβατιού θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
    },
  ],
];
