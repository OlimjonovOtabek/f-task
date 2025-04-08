import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export abstract class NotificationService {
  constructor(private messageService: MessageService) {}

  public showLoadError(
    message: string | null = null,
    key: string | undefined = undefined
  ) {
    this.messageService.add({
      key: key,
      severity: 'error',
      summary: 'Ошибка',
      detail: message ?? 'Ошибка при загрузке данных',
      life: 3000,
    });
  }

  public showLoadSuccess(
    message: string | null = null,
    key: string | undefined = undefined
  ) {
    this.messageService.add({
      key: key,
      severity: 'success',
      summary: 'Успешно',
      detail: message ?? 'Данные успешно загружены',
      life: 3000,
    });
  }

  public showCreateError(
    message: string | null = null,
    key: string | undefined = undefined,
    _error: any | null = null,
    _field: string | null = null
  ) {
    this.messageService.add({
      key: key,
      severity: 'error',
      summary: 'Ошибка',
      detail: message ?? 'Ошибка при создании записи',
      life: 3000,
    });
  }

  public showUpdateError(
    message: string | null = null,
    key: string | undefined = undefined,
    _error: any | null = null,
    _field: string | null = null
  ) {
    this.messageService.add({
      key: key,
      severity: 'error',
      summary: 'Ошибка',
      detail: message ?? 'Ошибка при обновлении записи',
      life: 3000,
    });
  }

  public showDeleteError(
    message: string | null = null,
    key: string | undefined = undefined
  ) {
    this.messageService.add({
      key: key,
      severity: 'error',
      summary: 'Ошибка',
      detail: message ?? 'Ошибка при удалении записи',
      life: 3000,
    });
  }

  public showCreateSuccess(
    message: string | null = null,
    key: string | undefined = undefined
  ) {
    this.messageService.add({
      key: key,
      severity: 'success',
      summary: 'Успешно',
      detail: message ?? 'Запись успешно создана',
      life: 3000,
    });
  }

  public showUpdateSuccess(
    message: string | null = null,
    key: string | undefined = undefined
  ) {
    this.messageService.add({
      key: key,
      severity: 'success',
      summary: 'Успешно',
      detail: message ?? 'Запись успешно обновлена',
      life: 3000,
    });
  }

  public showDeleteSuccess(
    message: string | null = null,
    key: string | undefined = undefined
  ) {
    this.messageService.add({
      key: key,
      severity: 'success',
      summary: 'Успешно',
      detail: message ?? 'Запись успешно удалена',
      life: 3000,
    });
  }
}
