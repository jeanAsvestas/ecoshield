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
        return '#FF9800';
      case 'Σε εκκρεμότητα':
        return '#2196F3';
      case 'Ολοκληρωμένη':
        return '#4CAF50';
      default:
        return '#757575';
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
          <Ionicons name="information-circle" size={30} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onSecondActionPress(job)}
        >
          <Ionicons name="flash" size={30} color="#6B7280" />
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
        <Text style={styles.headerText}>Οι Εργασίες μου</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 12,
  },
  jobItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  jobPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
    marginLeft: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  modalBody: {
    paddingVertical: 16,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  statusButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  statusButtonText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  closeModalButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JobList;
