import { theme } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface Job {
  id: string;
  description: string;
  status: 'Σε εκκρεμότητα' | 'Ολοκληρωμένη' | 'Ακυρωμένη';
  type: 'Home' | 'Professional';
  price?: number;
  details?: string;
}

interface Props {
  jobs: Job[];
  onInfoPress?: (job: Job) => void;
  onSecondActionPress?: (job: Job) => void;
}

const JobListItem = ({
  job,
  onInfoPress,
  onSecondActionPress,
}: {
  job: Job;
  onInfoPress: (job: Job) => void;
  onSecondActionPress: (job: Job) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ακυρωμένη':
        return theme.colors.statusCancelled;
      case 'Σε εκκρεμότητα':
        return theme.colors.statusPending;
      case 'Ολοκληρωμένη':
        return theme.colors.statusCompleted;
      default:
        return theme.colors.statusDefault;
    }
  };

  return (
    <View style={styles.jobItem}>
      <View style={styles.jobContent}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobTitle}>{job.description}</Text>
          {job.type === 'Home' && job.price !== undefined && (
            <Text style={styles.jobPrice}>€{job.price.toFixed(2)}</Text>
          )}
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(job.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {job.status.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => onInfoPress(job)}
        >
          <Ionicons
            name="information-circle"
            size={30}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onSecondActionPress(job)}
        >
          <Ionicons name="flash" size={30} color={theme.colors.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const JobList: React.FC<Props> = ({
  jobs,
  onInfoPress = () => {},
  onSecondActionPress = () => {},
}) => {
  const [jobData, setJobData] = useState<Job[]>(jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'info' | 'action'>('info');

  useEffect(() => {
    setJobData(jobs);
  }, [jobs]);

  const handleInfoPress = (job: Job) => {
    setSelectedJob(job);
    setModalMode('info');
    setModalVisible(true);
    onInfoPress(job);
  };

  const handleSecondActionPress = (job: Job) => {
    setSelectedJob(job);
    setModalMode('action');
    setModalVisible(true);
    onSecondActionPress(job);
  };

  const handleStatusChange = (status: Job['status']) => {
    if (!selectedJob) {
      return;
    }

    setJobData((prev) =>
      prev.map((job) => (job.id === selectedJob.id ? { ...job, status } : job))
    );
    setSelectedJob({ ...selectedJob, status });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Jobs</Text>
      </View>

      <FlatList
        data={jobData}
        renderItem={({ item }) => (
          <JobListItem
            job={item}
            onInfoPress={handleInfoPress}
            onSecondActionPress={handleSecondActionPress}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalMode === 'action' ? 'Update Status' : 'Job Details'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedJob && (
              <View style={styles.modalBody}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Περιγραφή:</Text>
                  <Text style={styles.detailValue}>
                    {selectedJob.description}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Κατάσταση:</Text>
                  <Text style={styles.detailValue}>
                    {selectedJob.status.replace('-', ' ').toUpperCase()}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Type:</Text>
                  <Text style={styles.detailValue}>
                    {selectedJob.type.toUpperCase()}
                  </Text>
                </View>

                {selectedJob.type === 'Home' && selectedJob.price && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Price:</Text>
                    <Text style={styles.detailValue}>
                      €{selectedJob.price.toFixed(2)}
                    </Text>
                  </View>
                )}

                {selectedJob.details && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Details:</Text>
                    <Text style={styles.detailValue}>
                      {selectedJob.details}
                    </Text>
                  </View>
                )}

                {modalMode === 'action' && (
                  <View style={styles.statusActions}>
                    <Text style={styles.detailLabel}>Αλλαγή κατάστασης:</Text>
                    <View style={styles.statusButtons}>
                      {(
                        ['Σε εκκρεμότητα', 'Ολοκληρωμένη', 'Ακυρωμένη'] as const
                      ).map((status) => {
                        const isActive = selectedJob.status === status;
                        return (
                          <TouchableOpacity
                            key={status}
                            style={[
                              styles.statusButton,
                              isActive ? styles.statusButtonActive : null,
                            ]}
                            onPress={() => handleStatusChange(status)}
                          >
                            <Text
                              style={[
                                styles.statusButtonText,
                                isActive ? styles.statusButtonTextActive : null,
                              ]}
                            >
                              {status}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceSecondary,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerText: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  jobItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.sm,
  },
  jobContent: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  jobPrice: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.success,
    marginLeft: theme.spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
  },
  statusText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    gap: 8,
  },
  infoButton: {
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  closeButton: {
    fontSize: theme.fontSize['3xl'],
    color: theme.colors.textMuted,
    fontWeight: theme.fontWeight.bold,
  },
  modalBody: {
    paddingVertical: theme.spacing.lg,
  },
  detailRow: {
    marginBottom: theme.spacing.lg,
  },
  detailLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textPrimary,
  },
  statusActions: {
    marginTop: 8,
    gap: 10,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statusButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  statusButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  statusButtonTextActive: {
    color: theme.colors.textInverse,
  },
  closeModalButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  closeModalButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
});

export default JobList;
