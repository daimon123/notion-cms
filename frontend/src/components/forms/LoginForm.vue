<template>
  <v-form @submit.prevent="onSubmit">
    <div class="space-y-4">
      <!-- 이메일 입력 -->
      <div>
        <v-text-field
          v-model="email"
          v-bind="emailAttrs"
          label="이메일"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          placeholder="admin@example.com"
          autocomplete="email"
          :error-messages="errors.email"
        />
      </div>

      <!-- 비밀번호 입력 -->
      <div>
        <v-text-field
          v-model="password"
          v-bind="passwordAttrs"
          label="비밀번호"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          autocomplete="current-password"
          :error-messages="errors.password"
          @click:append-inner="showPassword = !showPassword"
        />
      </div>

      <!-- 에러 메시지 -->
      <v-alert v-if="loginError" type="error" density="compact" class="text-sm">
        {{ loginError }}
      </v-alert>

      <!-- 로그인 버튼 -->
      <v-btn
        type="submit"
        color="primary"
        block
        size="large"
        :loading="isSubmitting"
        class="mt-2"
      >
        로그인
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { loginSchema } from '@/utils/validators';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const showPassword = ref(false);
const loginError = ref('');

// vee-validate + zod 폼 검증
const { handleSubmit, isSubmitting, errors, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

// 로그인 제출 핸들러
const onSubmit = handleSubmit(async (values) => {
  loginError.value = '';
  try {
    await authStore.login(values);
    const redirect = (route.query.redirect as string) || '/dashboard';
    router.push(redirect);
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    loginError.value = err.response?.data?.message || '로그인에 실패했습니다.';
  }
});
</script>
