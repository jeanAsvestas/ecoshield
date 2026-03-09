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
        {/* <Center>
          <Heading className="font-bold text-2xl">Expo- Tab 2</Heading>
          <Divider className="my-[30px] w-[80%]" />
          <Text className="p-4">
            Example below to use gluestack-ui components.
          </Text>
          <EditScreenInfo path="app/(app)/(tabs)/tab2.tsx" />
          <Heading className="font-bold text-2xl">Expo- Tab 2</Heading>
          <Divider className="my-[30px] w-[80%]" />
          <Text className="p-4">
            Example below to use gluestack-ui components.
          </Text>
          <EditScreenInfo path="app/(app)/(tabs)/tab2.tsx" />
          <Heading className="font-bold text-2xl">Expo- Tab 2</Heading>
          <Divider className="my-[30px] w-[80%]" />
          <Text className="p-4">
            Example below to use gluestack-ui components.
          </Text>
          <EditScreenInfo path="app/(app)/(tabs)/tab2.tsx" />
          <Heading className="font-bold text-2xl">Expo- Tab 2</Heading>
          <Divider className="my-[30px] w-[80%]" />
          <Text className="p-4">
            Example below to use gluestack-ui components.
          </Text>
          <EditScreenInfo path="app/(app)/(tabs)/tab2.tsx" />
          <Heading className="font-bold text-2xl">Expo- Tab 2</Heading>
          <Divider className="my-[30px] w-[80%]" />
          <Text className="p-4">
            Example below to use gluestack-ui components.
          </Text>
          <EditScreenInfo path="app/(app)/(tabs)/tab2.tsx" />
        </Center> */}
      </ScrollView>
    </SafeAreaView>
    // <>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{' '}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
    //       to see changes. Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <Link href="/modal">
    //       <Link.Trigger>
    //         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //       </Link.Trigger>
    //       <Link.Preview />
    //       <Link.Menu>
    //         <Link.MenuAction
    //           title="Action"
    //           icon="cube"
    //           onPress={() => Alert.alert('Action pressed')}
    //         />
    //         <Link.MenuAction
    //           title="Share"
    //           icon="square.and.arrow.up"
    //           onPress={() => Alert.alert('Share pressed')}
    //         />
    //         <Link.Menu title="More" icon="ellipsis">
    //           <Link.MenuAction
    //             title="Delete"
    //             icon="trash"
    //             destructive
    //             onPress={() => Alert.alert('Delete pressed')}
    //           />
    //         </Link.Menu>
    //       </Link.Menu>
    //     </Link>

    //     <ThemedText>
    //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       {`When you're ready, run `}
    //       <ThemedText type="defaultSemiBold">
    //         npm run reset-project
    //       </ThemedText>{' '}
    //       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
    //       directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

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
