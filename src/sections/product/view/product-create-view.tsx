'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import NewProductForm from '../new/new-product-form';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function ProductCreateView() {
  const { t } = useLocales();
  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading={t('products.create_product.create_product')}
        links={[
          {
            name: t('common.nav.home'),
            href: paths.dashboard.root,
          },
          {
            name: t('products.products'),
            href: paths.dashboard.products.root,
          },
          {
            name: t('products.add_product'),
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <NewProductForm />
      {/* <ProductNewEditForm /> */}
    </Container>
  );
}
