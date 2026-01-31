import CalendarComponent from '@/components/calendar';
import EditScreenInfo from '@/components/edit-screen-info';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
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
        <CalendarComponent weekView />
        <Center>
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
        </Center>
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
