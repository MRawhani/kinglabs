<template>
	<layout title="التقارير">
		<v-tabs>
			<v-tab>ماخص مالي حسب الفرع</v-tab>
			<v-tab>تقرير مالي تفصيلي</v-tab>
			<v-tab-item>
				<v-divider></v-divider>
				<v-btn class="my-2 ms-2" color="primary" @click="printSummary">
					<v-icon left>mdi-printer</v-icon>
					طباعة
				</v-btn>
				<v-divider></v-divider>
				<v-data-table :loading="isLoading" :items="summary" :headers="summaryHeaders">
					<template v-slot:[`item.invoices_sum_discount`]="{ value }"> {{ value || 0 }} </template>
					<template v-slot:[`item.invoices_sum_fee`]="{ value }"> {{ value || 0 }} </template>
					<template v-slot:[`item.invoices_sum_total_amount`]="{ item }"> {{ calcAmount(item) }} </template>
					<template v-slot:[`item.net_amount`]="{ item }"> {{ item.invoices_sum_total_amount || 0 }} </template>
					<template v-slot:[`body.append`]>
						<tr class="primary--text blue lighten-5">
							<td>الاجمالي</td>
							<td></td>
							<td>{{ summary.reduce((prev, cur) => prev + cur.invoices_count, 0) }}</td>
							<td>{{ amountTotal }}</td>
							<td>{{ discountTotal }}</td>
							<td>{{ summary.reduce((prev, cur) => prev + cur.invoices_sum_fee, 0) }}</td>
							<td>{{ netTotal }}</td>
						</tr>
					</template>
				</v-data-table>
			</v-tab-item>
			<v-tab-item>
				<v-divider></v-divider>
				<v-btn class="my-2 ms-2" color="primary" @click="printData">
					<v-icon left>mdi-printer</v-icon>
					طباعة
				</v-btn>
				<v-divider></v-divider>
				<v-data-table :loading="isLoading" :items="data" :headers="dataHeaders" :item-class="isDuplicate">
					<template v-slot:[`item.amount`]="{ item }"> {{ item.amount + item.discount }} </template>
					<template v-slot:[`item.net_amount`]="{ item }"> {{ item.amount + item.discount - item.discount - item.fee }} </template>
					<template v-slot:[`body.append`]>
						<tr class="primary--text blue lighten-5">
							<td>الاجمالي</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>{{ amountTotal }}</td>
							<td>{{ discountTotal }}</td>
							<td>{{ filterdData.reduce((prev, cur) => prev + cur.fee, 0) }}</td>
							<td>{{ netTotal }}</td>
						</tr>
					</template>
				</v-data-table>
			</v-tab-item>
		</v-tabs>
	</layout>
</template>

<script>
import Layout from './layout/Layout.vue';
import { reportsActions } from '../state/mapper';
import printJS from 'print-js';

export default {
	components: { Layout },
	name: 'Reports',

	data: () => ({
		summary: [],
		data: [],
		isLoading: false,
	}),

	computed: {
		summaryHeaders() {
			return [
				{ text: 'الرقم', value: 'id' },
				{ text: 'اسم الفرع', value: 'name' },
				{ text: 'عدد الفحوصات', value: 'invoices_count' },
				{ text: 'اجمالي المبلغ', value: 'invoices_sum_total_amount' },
				{ text: 'اجمالي الخصم', value: 'invoices_sum_discount' },
				{ text: 'عمولة الوكيل', value: 'invoices_sum_fee' },
				{ text: 'صافي التوريد', value: 'net_amount' },
			];
		},
		dataHeaders() {
			return [
				{ text: 'الرقم', value: 'id' },
				{ text: 'اسم الفرع', value: 'barnch' },
				{ text: 'التاريخ', value: 'date' },
				{ text: 'اسم العميل', value: 'agent' },
				{ text: 'رقم الجواز', value: 'identityNo' },
				{ text: 'اجمالي المبلغ', value: 'amount' },
				{ text: 'اجمالي الخصم', value: 'discount' },
				{ text: 'عمولة الوكيل', value: 'fee' },
				{ text: 'صافي التوريد', value: 'net_amount' },
			];
		},
		filterdData() {
			return this.data.filter((item) => !item.duplicate);
		},
		amountTotal() {
			return this.filterdData.reduce((prev, cur) => (prev += cur.amount + cur.discount), 0);
		},
		discountTotal() {
			return this.filterdData.reduce((prev, cur) => prev + cur.discount, 0);
		},
		netTotal() {
			return this.filterdData.reduce((prev, cur) => (prev += cur.amount - cur.fee), 0);
		},
	},

	async created() {
		try {
			this.isLoading = true;
			this.summary = await this.getFinancialSummary();
			this.data = await this.getFinancialData();
			this.isLoading = false;
		} catch (error) {
			this.$VAlert.error('عذرا حدث خطأ!');
			this.isLoading = false;
		}
	},

	methods: {
		...reportsActions,
		isDuplicate(item) {
			return item.duplicate ? 'red lighten-5' : '';
		},
		calcNet(item) {
			const discount = item.invoices_sum_discount || 0;
			const fee = item.invoices_sum_fee || 0;

			return this.calcAmount(item) - discount - fee;
		},
		calcAmount(item) {
			const amount = item.invoices_sum_total_amount || 0;
			const discount = item.invoices_sum_discount || 0;
			const fee = item.invoices_sum_fee || 0;

			return amount + discount + fee;
		},
		printSummary() {
			printJS({
				printable: `/print/reports/summary`,
				type: 'pdf',
			});
		},

		printData() {
			printJS({
				printable: `/print/reports/data`,
				type: 'pdf',
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
