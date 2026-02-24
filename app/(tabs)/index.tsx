import CalendarComponent from '@/components/calendar';
import JobList, { Job } from '@/components/job-list';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  const handleDateSelect = (date: string) => {
    console.log('Selected date:', date);
    // Handle date selection here
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <CalendarComponent />
        <JobList
          jobs={jobsList}
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

const jobsList: Job[] = [
  {
    id: '1',
    description: 'Απεντόμωση σε εξωτερικό χώρο',
    status: 'Ολοκληρωμένη',
    type: 'Home',
    price: 50,
    details:
      'Η απεντόμωση θα γίνει σε εξωτερικό χώρο, με χρήση οικολογικών προϊόντων. Η διάρκεια της εργασίας εκτιμάται σε 2 ώρες.',
  },
  {
    id: '2',
    description: 'Καθαρισμός καναπέ',
    status: 'Ακυρωμένη',
    type: 'Professional',
    price: 30,
    details:
      'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
  },
  {
    id: '3',
    description: 'Καθαρισμός καναπέ',
    status: 'Σε εκκρεμότητα',
    type: 'Professional',
    price: 30,
    details:
      'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
  },
  {
    id: '4',
    description: 'Καθαρισμός καναπέ',
    status: 'Σε εκκρεμότητα',
    type: 'Professional',
    price: 30,
    details:
      'Ο καθαρισμός του καναπέ θα γίνει με ειδικά καθαριστικά προϊόντα και θα περιλαμβάνει την αφαίρεση λεκέδων και τη φρεσκάρισμα του υφάσματος.',
  },
];
