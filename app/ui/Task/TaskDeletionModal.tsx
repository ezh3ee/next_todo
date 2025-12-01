import {Button, Modal, ModalBody, ModalHeader} from "flowbite-react";
import {Task} from "@/app/generated/prisma/client";
import {deleteTask} from "@/app/lib/task/actions";
// import {}

type TaskDeletionModalProps = {
    task: Task;
    onConfirmDeletionAction: () => void;
    onCancelDeletionAction: () => void;
}

export default function TaskDeletionModal({task, onConfirmDeletionAction, onCancelDeletionAction}: TaskDeletionModalProps) {
    const deleteTaskEvent = async () => {
        if (await deleteTask(task.id)) {
            onConfirmDeletionAction();
        }
    }

    return (
        <>
            <Modal show={true} size="md" popup onClose={onCancelDeletionAction}>
                <ModalHeader/>
                <ModalBody>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Удалить задачу "{task?.text}"?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={deleteTaskEvent} className="cursor-pointer">
                            {/*<Button color="red">*/}
                                Да
                            </Button>
                            <Button color="alternative" onClick={onCancelDeletionAction} className="cursor-pointer">
                                Нет
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}